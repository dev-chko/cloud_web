import React, { useState, useEffect } from "react";
import { useUser } from "../../auth/useUser";
import { useQuery } from "react-query";
import Mynavigation from "./Mynavigation";
import { getStoredUser } from "../../user-storage";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import axios from "axios";
import "dayjs/locale/ko";
import ModalBasic from "../../components/contents/Modal";

const fetchInquiry = async (user) => {
  if (!user) return null;
  const accessToken = getStoredUser();
  const response = await fetch(`/api/v1/boards/inquiry/${user?.mIdx}`, {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
  });
  return response.json();
};

const submitInquiry = async (data) => {
  if (!data) return null;
  const accessToken = getStoredUser();
  const response = await axios.post("/api/v1/boards/", data, {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
  });
  return response;
};

export default function Inquiry() {
  const [refresh, setRefresh] = useState(false);
  const { user } = useUser();
  const [input, setInput] = useState({
    category: "qna",
    subject: "",
    body: "",
    readCount: 0,
    writer: user.name,
    writerIdx: user.mIdx,
    isPublic: false,
    isTopDisplay: false,
  });
  const { subject, body } = input;
  const { data, isLoading } = useQuery(
    ["usage", refresh],
    () => fetchInquiry(user),
    {
      keepPreviousData: true,
    }
  );
  dayjs.locale("ko");
  const [viewInputModal, setViewInputModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onClickSubmit = async () => {
    try {
      const response = await submitInquiry(input);
      if (response.status === 200) {
        setViewInputModal(false);
        setInput({
          category: "qna",
          subject: "",
          body: "",
          readCount: 0,
          writer: user.name,
          writerIdx: user.mIdx,
          isPublic: false,
          isTopDisplay: false,
        });
        setRefresh(!refresh);
      }
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {}, [refresh]);

  const columns = [
    {
      id: "title",
      name: "제목",
      selector: (row) => row.subject,
      compact: true,
      center: true,
    },
    {
      id: "body",
      name: "내용",
      selector: (row) => row.body,
    },
    {
      id: "reply",
      name: "답변",
      selector: (row) =>
        row.replies !== undefined ? row.replies[0]?.content : "-",
    },
    {
      id: "time",
      name: "문의 날짜",
      selector: (row) => dayjs(row.created).format("YYYY. MM. DD. dddd. HH:mm"),
      compact: true,
      center: true,
    },
  ];

  if (isLoading)
    return (
      <>
        <div className="mt-20 h-[35rem]">
          <div className="flex flex-col-reverse items-center justify-around mx-lg  border-b md:flex-row h-24 md:h-32">
            <p className="text-4xl">마이 페이지</p>
          </div>
          <Mynavigation user={user} />
          {/* 마이페이지 내용 */}
          <div className="flex justify-center">is Loading ...</div>
        </div>
      </>
    );
  return (
    <>
      <div className="mt-20 h-[60rem]">
        <Mynavigation user={user} />
        {/* 마이페이지 내용 */}
        <div className="flex justify-end mt-10 rounded-lg border-solid p-4">
          <button
            className="bg-cyan-700 text-white rounded-md p-2 hover:bg-cyan-900"
            onClick={() => setViewInputModal(!viewInputModal)}
          >
            문의하기
          </button>
        </div>
        <div className="flex items-center justify-center flex-col bg-white">
          <DataTable columns={columns} data={data.data} pagination />
        </div>
      </div>
      <ModalBasic
        id="view-modal"
        modalOpen={viewInputModal}
        setModalOpen={setViewInputModal}
        title="1:1 문의하기"
      >
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div id="약관" className="text"></div>
            <div className="flex flex-col justify-center">
              <label className="flex flex-col my-2">
                <div className="w-full">제목</div>
                <input
                  className="w-full border-2 p-2 rounded-lg"
                  onChange={onChange}
                  name="subject"
                  value={subject}
                />
              </label>
              <label className="my-4">
                <div className="w-full">내용</div>
                <textarea
                  className="w-full rounded-lg h-52 p-2 resize-none overflow-y:hidden border-2"
                  name="body"
                  value={body}
                  onChange={onChange}
                ></textarea>
              </label>
              {/* <button className="border-spacing-8 p-2 text-white bg-cyan-800 rounded-md">
                확인
              </button> */}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="bg-cyan-700 text-white rounded-md p-2 hover:bg-cyan-900"
              onClick={(e) => {
                e.stopPropagation();
                onClickSubmit();
              }}
            >
              제출
            </button>
            <button
              className="btn-sm border-slate-200 hover:bg-slate-800 text-slate-600 hover:text-white rounded-md p-2"
              onClick={(e) => {
                setViewInputModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}
