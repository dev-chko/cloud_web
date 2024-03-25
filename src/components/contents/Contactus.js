import react, { useEffect, useRef, useState } from "react";
import { useCustomToast } from "../hooks/useCustomToast";
import axios from "axios";

// const fetchNotify = async (title, content) => {
//   var data = [];
//   data.push(
//     "message=" + encodeURIComponent(`입점문의: ${title} \n\n${content}`)
//   );
//   console.log("data :>> ", data);
//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//     Authorization: "Bearer Xfzk3iqTlpvW1TaIywADgN4PTapkweNaHWrxCEedTMZ",
//   };
//   const request = await fetch({
//     method: "post",
//     url: "https://notify-api.line.me/api/notify",
//     data: data,
//     headers: headers,
//   });
//   console.log("request :>> ", request);
//   return request;
// };

const fetchContact = async (info) => {
  const request = await axios({
    method: "post",
    url: "/api/v1/contactus/email",
    data: info,
  });
  return request.data;
};

export default function Contactus() {
  const [input, setInput] = useState({
    cops: "",
    mobile: "",
    emal: "",
    content: "",
  });
  const { cops, mobile, email, content } = input;

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const toast = useCustomToast();

  const onSumbitHandle = async (e) => {
    if (window.confirm("제출하시겠습니까?")) {
      e.preventDefault();
      if (cops && mobile && email && content) {
        // const status_title = "문의사항을 제출하고있습니다.";
        // toast({ status_title, status: "info" });
        const SendContact = await fetchContact(input);
        console.log("SendContact :>> ", SendContact);
        if (SendContact.statusCode === 200) {
          const title = "제출이 완료되었습니다.";
          toast({ title, status: "success" });
          setInput({
            cops: "",
            mobile: "",
            email: "",
            content: "",
          });
        } else {
          const title = "제출에 실패하였습니다. 관리자에게 문의해주세요.";
          toast({ title, status: "warning" });
        }
      } else {
        const title = "항목을 채워주세요.";
        toast({ title, status: "warning" });
      }
    } else {
      const title = "제출을 취소했습니다.";
      toast({ title, status: "warning" });
    }
  };
  return (
    <div id="contactus" className="container mb-40 pt-40">
      <div className="min-w-[183px] font-bold text-[40px]  text-[#003b55] text-center pb-10">
        입점문의
      </div>
      <div className="flex flex-col items-center">
        <div className="min-w-[280px] w-full md:w-[700px] rounded-lg  bg-[#2d92bd] flex  flex-col justify-start relative">
          <div className="pb-20">
            <form className="mt-3 px-10 w-full">
              <label>
                <div className="text-white text-[20px] font-bold pt-8">
                  회사명
                </div>
                <input
                  className="w-full rounded-lg h-12 px-4 pl-6"
                  name="cops"
                  value={cops}
                  onChange={onChangeValue}
                />
              </label>
              <label>
                <div className="text-white text-[20px] font-bold pt-8">
                  연락처
                </div>
                <input
                  className="w-full rounded-lg h-12 px-4 pl-6"
                  name="mobile"
                  type="number"
                  value={mobile}
                  onChange={onChangeValue}
                />
              </label>
              <label>
                <div className="text-white text-[20px] font-bold pt-8">
                  이메일
                </div>
                <input
                  className="w-full rounded-lg h-12 px-4 pl-6"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeValue}
                />
              </label>
              <label>
                <div className="text-white text-[20px] font-bold pt-8">
                  내용
                </div>
                <textarea
                  className="w-full rounded-lg h-52 p-4 resize-none overflow-y:hidden"
                  name="content"
                  value={content}
                  onChange={onChangeValue}
                />
              </label>
            </form>
          </div>
          <button
            onClick={(e) => onSumbitHandle(e)}
            className="bg-white rounded-lg absolute w-12 h-10 bottom-4 right-9 "
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
