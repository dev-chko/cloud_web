import React, { useState } from "react";
import { useUser } from "../auth/useUser";
import useAuth from "../auth/useAuth";

import Mynavigation from "./mypage/Mynavigation";
import { getStoredUser } from "../user-storage";
import axios from "axios";

import ModalBasic from "../components/contents/Modal";

async function checkPassword(user, password) {
  const { accessToken } = getStoredUser();
  const response = await axios.post(
    "/api/v1/auth/checkpw",
    { username: user, password: password },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
}

async function secessionUser(user, password) {
  const { accessToken } = getStoredUser();
  const response = await axios.post(
    "/api/v1/auth/secession",
    { username: user, password: password },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
}

export default function Mypage() {
  const { user } = useUser();
  const auth = useAuth();
  const [viewDeleteModal, setViewDelteModal] = useState(false);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [Authorization, setAuthorization] = useState(false);
  const [password, setPassword] = useState();
  const [checktag, setChecktag] = useState(false);
  const onClickDeleteModal = (e) => {
    // if (window.confirm("회원 탈퇴시 잔여 포인트는 소멸합니다.")) {
    setViewDelteModal(true);
    e.preventDefault();
    // }
  };
  const checkPwUser = async (e) => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
    }
    try {
      const { data } = await checkPassword(user.email, password);
      if (data.data === true) {
        setAuthorization(true);
      }
    } catch (err) {}
  };

  const onClickSecessionUser = async () => {
    try {
      const { data } = await secessionUser(user.email, password);
      if (data.data === true) {
        alert("탈퇴처리가 완료되었습니다");
        useUser.signout();
      }
      // if (data ===true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" mt-20 h-[60rem] md:h-[50rem]">
        <Mynavigation user={user} />
        {/* 마이페이지 내용 */}
        <div className="flex md:justify-center md:items-center items-center grid-cols-2 gap-4 flex-col sm:flex-col md:flex-row">
          <div className="flex md:w-[522px] md:h-[280px] w-[265px] h-[230px] rounded-lg border text-left pl-10 my-10 pb-5">
            <div className="grid ">
              <div>
                <p>회원번호 : {user.mIdx}</p>
                <p>Point: {user.point?.balance || 0}</p>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.mobile}</div>
              </div>
              <div className="flex flex-col justify-around place-items-stretch text-center">
                <button
                  className="w-20 h-8 bg-cyan-700 rounded-lg hover:bg-slate-400 text-white font-bold disabled:bg-slate-600"
                  disabled
                >
                  수정하기
                </button>
                <button
                  className="w-20 h-8 bg-cyan-600 rounded-lg hover:bg-slate-400 text-white font-bold"
                  onClick={() => onClickDeleteModal()}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
          {user.role === "admin" ? (
            <>
              <div className="flex md:w-[522px] md:h-[280px] w-[265px] h-[230px] rounded-lg border text-left pl-10 my-10 pb-5">
                <div className="grid ">
                  <div>관리자용 화면입니다.</div>
                  <div className="flex justify-around">
                    <button className="w-16 h-8 ">수정하기</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <ModalBasic
          id="view-modal"
          modalOpen={viewDeleteModal}
          setModalOpen={setViewDelteModal}
          title="회원 탈퇴"
        >
          {/* Modal content */}
          <div className="px-5 py-4">
            <div className="space-y-3">
              <div id="약관" className="text"></div>
              {Authorization === false ? (
                <div className="flex justify-center">
                  <input
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="border-spacing-8 p-2 text-white bg-cyan-800 rounded-md"
                    onClick={() => checkPwUser()}
                  >
                    확인
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <h2 className="text-xl">
                      그린비티 통합 회원 탈퇴 안내 고지
                    </h2>
                    <div className="mt-3">
                      그린비티 토큰(GRBT) 및 CloudPC 포인트는 모두 삭제되니 이를
                      꼭 숙지하시고 계약 해지하시기 바랍니다. 회원 동의하에
                      계약이 해지된 계정은 어떠한 방법으로도 복구가 불가하며
                      보유했던 그린비티 토큰(GRBT) 및 CloudPC 포인트도 복구가
                      불가합니다.
                    </div>
                    <div className="m-3">
                      <label>
                        <input
                          type="checkbox"
                          checked={checktag}
                          onChange={() => setChecktag(!checktag)}
                        />
                        위 사항에 대해 인지하였습니다.
                      </label>
                    </div>
                  </div>

                  <button
                    className={`h-8 w-24 bg-red-600 text-white font-bold m-4 rounded-lg hover:bg-red-800 disabled:bg-slate-800`}
                    disabled={!checktag}
                    onClick={async () => {
                      onClickSecessionUser();
                      auth.signout();
                    }}
                  >
                    탈퇴하기
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Modal footer */}
          {/* <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewDelteModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div> */}
        </ModalBasic>
      </div>
    </>
  );
}
