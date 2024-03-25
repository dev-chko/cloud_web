import axios from "axios";

import { useCustomToast } from "../components/hooks/useCustomToast";
import { useUser } from "./useUser";
import { getJWTHeader } from "../axiosInstance";

export default function UseAuth() {
  // const SERVER_ERROR = "There was an error contacting the server.";
  const toast = useCustomToast();
  const { clearUser, updateUser, clearPoint, updatePoint, user } = useUser();

  async function authSignIn(username, password) {
    try {
      const { data, status } = await axios.post(
        "/api/v1/auth/login",
        { username: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (status === 400) {
        const title =
          "mesage" in data ? data.message : "로그인에 실패하였습니다.";
        toast({ title, status: "warning" });
        return;
      }
      if (status === 401) {
        const title =
          "mesage" in data ? data.message : "로그인에 실패하였습니다.";
        toast({ title, status: "warning" });
        return;
      }
      if ("email" in data.data && "accessToken" in data.data) {
        toast({
          title: `${data.data.email} 로그인 되었습니다.`,
          status: "info",
        });
      }
      // const { data: point } = await axios.get(
      //   `/api/v1/point/${data?.data.mIdx}`,
      //   {
      //     headers: getJWTHeader(user),
      //   }
      // );
      // console.log("point :>> ", point);

      updateUser(data.data);
      // updatePoint(point.data);
      return data.data;
      // return data?.data.mIdx;
    } catch (e) {
      const title = e?.data || "Unauthorized";
      toast({ title, status: "error" });
    }
  }
  async function signin(email, password) {
    authSignIn(email, password);
  }

  // async function getPoint(user) {
  //   try {
  //     const { data } = await axios.get(`/api/v1/point/${user.mIdx}`, {
  //       headers: { Authorization: `Bearer ${user.accessToken}` },
  //     });
  //     updatePoint(data.data);
  //     return;
  //   } catch (e) {
  //     console.log(e);
  //     const title = e?.data || "Unauthorized";
  //     toast({ title, status: "error" });
  //   }
  // }

  function signout() {
    clearUser();
    clearPoint();
    toast({
      title: "Logged out!",
      status: "info",
    });
  }

  return {
    signin,
    signout,
    authSignIn,
    // getPoint,
  };
}
