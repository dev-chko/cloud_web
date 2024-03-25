import React, { useEffect, useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
//import Editor from '@draft-js-plugins/editor';

import createImagePlugin from "@draft-js-plugins/image";
import {
  EditorState,
  convertToRaw,
  ContentState,
  RichUtils,
  AtomicBlockUtils,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const GrinbitEditor = ({ onChange, value, readonly }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [initValue, setInitValue] = useState(value);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getBase64Image = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const handlePastedFiles = async (files) => {
    const attachUrl = URL.createObjectURL(files[0]);

    setEditorState(insertImage(await getBase64Image(attachUrl))); //created below
  };

  const insertImage = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  useEffect(() => {
    const editorToHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    onChange(editorToHtml);
  }, [editorState]);

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(initValue);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [initValue]);

  return (
    <div>
      <Editor
        wrapperclassName="wrapper-className"
        editorclassName="editor"
        toolbarclassName="toolbar-className"
        toolbar={{
          options: [
            "inline",
            "colorPicker",
            "fontSize",
            "list",
            "textAlign",
            "image",
            "history",
          ], // 'fontFamily', 'blockType',
          inline: {
            options: ["bold", "italic", "underline"],
          },
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          // list: { inDropdown: true },
          // textAlign: { inDropdown: true },
          // link: { inDropdown: false },
          // history: { inDropdown: false },
          // fontFamily: {
          //   options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          //   className: undefined,
          //   component: undefined,
          //   dropdownclassName: undefined,
          // },
          // fontSize: {
          //   options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          //   className: undefined,
          //   component: undefined,
          //   dropdownclassName: undefined,
          // },
        }}
        toolbarHidden={readonly}
        placeholder="내용을 작성해주세요."
        localization={{
          locale: "ko",
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        // onChange={onEditorChange}
        handlePastedFiles={handlePastedFiles}
        readOnly={readonly}
      />
    </div>
  );
};

export default GrinbitEditor;
