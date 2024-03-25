import axios from "axios";
// import { useQueryClient } from "../react-query/queryClient";
import { useQuery, useQueryClient } from "react-query";

// import type { User } from "../shared/types";
import { getJWTHeader } from "../axiosInstance";
import {
  clearStoredUser,
  getStoredUser,
  setStoredPoint,
  setStoredUser,
} from "../user-storage";

async function getUser(user) {
  if (!user) return null;
  try {
    const { data, isError, error, status } = await axios.get(
      `/api/v1/users/${user.mIdx}`,
      {
        headers: getJWTHeader(user),
      }
    );
    return data.data;
  } catch (e) {
    console.log("e :>> ", e);
    return;
  }
}

// async function getPoint(user) {
//   if (!user) return null;
//   try {
//     const { data } = await axios.get(`/api/v1/point/${user.mIdx}`, {
//       headers: getJWTHeader(user),
//     });
//     return data.data;
//   } catch (e) {
//     console.log("e :>> ", e);
//     return;
//   }
// }

export function useUser() {
  const queryCleint = useQueryClient();
  const { data: user, status } = useQuery(["user"], () => getUser(user), {
    initialData: getStoredUser,
    onSuccess: (received) => {
      if (!received) {
        clearStoredUser();
      } else {
        setStoredUser(received);
      }
    },
  });

  // meant to be called from useAuth
  function updateUser(newUser) {
    queryCleint.setQueryData(["user"], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryCleint.setQueryData(["user"], null);
  }

  // const { data: point } = useQuery(["point"], () => getPoint(user), {
  //   initialData: getPoint,
  //   onSuccess: (received) => {
  //     if (!received) {
  //       clearPoint();
  //     } else {
  //       setStoredPoint(received);
  //     }
  //   },
  // });
  // function updatePoint(data) {
  //   queryCleint.setQueryData(["point"], data);
  // }

  // // meant to be called from useAuth
  // function clearPoint() {
  //   queryCleint.setQueryData(["point"], null);
  // }

  return {
    user,
    updateUser,
    clearUser,
    // point, updatePoint, clearPoint
  };
}
