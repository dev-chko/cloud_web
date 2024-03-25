import React, { useState, useEffect, useRef } from "react";
import AuthCode from "react-auth-code-input";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const authSend = async (input) => {
  const { data } = await axios.post("/api/v1/auth/refound/sms", input);
  return data;
};

const SmsAuthCheck = async (input) => {
  const { data } = await axios.post("/api/v1/auth/refound/sms/check", input);
  return data;
};

const sumbmitChange = async () => {
  const { data } = await axios.post();
  return data;
};

export default function Refound() {
  const [phoneAuth, setResult] = useState(false);
  const inputE1 = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [AuthResponse, setAuthResponse] = useState("");
  const toast = useToast({
    isClosable: true,
    variant: "subtle",
    position: "bottom",
  });

  const [input, setInput] = useState({
    id: "",
    smsRecipient: "",
    smsCountry: "82",
    smsAuth: "",
    password: "",
    confirmPassword: "",
    type: "2",
  });
  const { id, smsRecipient, password, confirmPassword } = input;

  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setInput({ ...input, password: e.target.value });
  };

  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setInput({ ...input, confirmPassword: e.target.value });
  };

  useEffect(() => {
    inputE1.current.focus();
  }, []);
  const onClickAuth = async () => {
    try {
      const { data } = await authSend(input);
      if (data.status === 400) {
        alert("일치하는 사용자가 없습니다.");
      } else {
        alert("SMS인증을 전송하였습니다.");
      }
    } catch (err) {
      const title = `네트워크 에러입니다.. 관리자에게 문의하세요.`;
      toast({ title, status: "error" });
      throw new Error("Network Error");
    }
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleOnChange = (res) => {
    setResult(res);
    setInput({ ...input, smsAuth: phoneAuth });
  };

  const onClicksmsAuth = async () => {
    const { data } = await SmsAuthCheck(input);
    if (data?.data === true) {
      setAuthResponse(true);
    } else if (data?.data === false) {
      setAuthResponse(false);
    } else {
      const title = `네트워크 에러입니다.. 관리자에게 문의하세요.`;
      toast({ title, status: "error" });
    }
  };

  const onSubmitPass = async () => {};

  return (
    <div>
      <div className="flex items-center justify-center min-h-[50rem] mt-10">
        <div className="flex justify-center xs:w-[680px] h-[680px] md:w-[680px] sm:w-full md:h-[680px] sm:h-[520px] min-w-[280px]">
          <div className="p-4 flex flex-col space-y-10">
            <div className="text-center text-4xl font-bold text-cyan-900">
              비밀번호 재설정
            </div>
            <label>
              <span className="inline-block pr-4 text-sm sm:text-lg  md:text-lg  w-[55px] sm:w-[80px] md:w-[80px]">
                이메일
              </span>
              <input
                ref={inputE1}
                type="email"
                placeholder="example@gmail.com"
                name="id"
                onChange={onChangeValue}
                class="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      sm:w-[260px] md:w-[365px] xs:w-[240px]"
              />
            </label>
            <div className="flex">
              <label>
                <span className="inline-block pr-4 text-sm sm:text-lg  md:text-lg w-[65px] sm:w-[80px] md:w-[80px]">
                  전화번호
                </span>
                <input
                  type="number"
                  parttern="[0-9]*"
                  placeholder='"-"를 제외한 전화번호'
                  onChange={onChangeValue}
                  maxLength="11"
                  name="smsRecipient"
                  class="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      sm:w-[165px] md:w-[265px] xs:w-[145px] w-[100px]"
                />
              </label>
              <button
                className="w-[40px] md:w-[80px] md:h-[40px] text-sm md:text-lg bg-cyan-800 text-white rounded-lg mx-4 text-whit disabled:bg-black"
                onClick={onClickAuth}
                disabled={id === "" || smsRecipient === "" ? true : false}
              >
                인증 발송
              </button>
            </div>
            <div className="-pt-20 ">
              <div className="flex justify-center items-center">
                <label>
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={handleOnChange}
                    containerClassName="container"
                    inputClassName="input"
                    placeholder="0"
                    autoFocus="0"
                    length={"5"}
                  />
                </label>
                <button
                  className="w-[80px] h-[40px] bg-cyan-800 rounded-lg  text-white disabled:bg-black"
                  disabled={phoneAuth.length === 5 ? false : true}
                  onClick={onClicksmsAuth}
                >
                  확인
                </button>
              </div>
              <br />
              {AuthResponse === "" ? (
                <></>
              ) : (
                <>
                  {AuthCode === false ? (
                    <div className="text-center text-red-600">
                      코드가 확인되지 않았습니다.
                    </div>
                  ) : (
                    <div className="text-center text-green-600">
                      확인되었습니다.
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <span>새로운 비밀번호</span>

              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                className="p-2 rounded-md"
                value={password}
                onChange={onChangePassword}
              />
              {passwordError === true ? (
                <div className="text-xs h-2 text-green-700 px-2">
                  비밀번호는 영문 대소문자 !,@,#,$ 숫자를 혼합하여 8~20자로
                  입력해주세요
                </div>
              ) : (
                <div className="h-2"></div>
              )}
              <input
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                className="p-2 rounded-md"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              {confirmPasswordError === true ? (
                <div className="text-xs h-4 text-red-600 px-2">
                  비밀번호가 일치하지 않습니다.
                </div>
              ) : (
                <div className="h-4"></div>
              )}
            </div>
            <button
              className="bg-cyan-800 text-white font-bold rounded-lg p-2 disabled:bg-black"
              disabled={
                id === "" ||
                smsRecipient === "" ||
                phoneAuth === false ||
                AuthCode === true ||
                password !== confirmPassword
                  ? true
                  : false
              }
              // onClick={}
            >
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
