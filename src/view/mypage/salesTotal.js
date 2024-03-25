import React from "react";
import { useUser } from "../../auth/useUser";
import { useQuery } from "react-query";
import Mynavigation from "./Mynavigation";
import { getStoredUser } from "../../user-storage";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const fetchInquiry = async (user) => {
  if (!user) return null;
  const accessToken = getStoredUser();
  const response = await fetch(`/api/v1/boards/inquiry/${user?.mIdx}`, {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
  });
  return response.json();
};

export default function Inquiry() {
  const { user } = useUser();

  const { data, isLoading, isError, error } = useQuery(
    ["usage"],
    () => fetchInquiry(user),
    { keepPreviousData: true }
  );
  dayjs.locale("ko");

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
        <div className="mt-20 h-[60rem]">
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
      <div className="mt-20 h-[50rem]">
        <Mynavigation user={user} />
        {/* 마이페이지 내용 */}
        <div className="flex justify-end mt-10 rounded-lg border-solid">
          <button>문의하기</button>
        </div>
        <div className="flex items-center justify-center flex-col bg-white">
          <DataTable columns={columns} data={data?.data} pagination />
        </div>
      </div>
    </>
  );
}
