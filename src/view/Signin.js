import react, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";

import { redirect } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [saveCheck, setSaveCheck] = useState(false);
  const [pw, setPw] = useState();
  const auth = useAuth();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveCheck === true) {
      localStorage.setItem("saveId", email);
    }
    // const token = await auth.signin(username, pw);
    const token = await auth.authSignIn(email, pw);
    if (token) {
      navigate(`/user`);
    }
  };
  const onClickSave = (e) => {
    setSaveCheck(e.target.checked);
    if (e.target.checked === false) {
      localStorage.removeItem();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("saveId")) {
      setEmail(localStorage.getItem("saveId"));
      setSaveCheck(true);
    }

    if (saveCheck === false) {
      localStorage.removeItem("saveId");
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center md:items-center min-h-[30rem] md:min-h-[50rem] sm:min-h-[50rem] lg:min-h-[60rem]">
        <div className="">
          <div className="flex flex-col items-center min-w-[300px] md:w-[540px] p-10 ">
            <div className="text-center py-5">
              <p className="text-3xl">로그인</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div>
                <div className="flex flex-row h-14 justify-center items-center bg-[#0877a7] rounded-[15px] w-[240px]">
                  <input
                    className="w-full h-12  mx-5 bg-[#0877a7] rounded-lg text-white"
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className="flex flex-row h-14 justify-center items-center bg-[#0877a7] rounded-[15px]">
                  <input
                    className="w-full h-12 rounded mx-5 bg-[#0877a7] rounded-lg text-white"
                    type="password"
                    placeholder="비밀번호"
                    name="pw"
                    onChange={(e) => setPw(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full pt-5 flex flex-col justify-center ">
                <button className="w-full bg-[#2d92bd] rounded-lg h-10 text-white">
                  로그인
                </button>
                <br />
                <div className="flex justify-around ">
                  <label for="rememeberId">
                    <a href="/refound">비밀번호 찾기</a>
                  </label>
                  <a href="/signup">회원가입</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
