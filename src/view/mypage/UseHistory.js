import React from "react";
import { useUser } from "../../auth/useUser";
import { useQuery } from "react-query";
import Mynavigation from "./Mynavigation";
import { getStoredUser } from "../../user-storage";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const fetchUsage = async (user) => {
  if (!user) return null;
  const accessToken = getStoredUser();
  const response = await fetch(`/api/v1/usage-summary/${user.mIdx}`, {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
  });
  return response.json();
};

const columns = [
  {
    id: "Uid",
    name: "사용시간",
    selector: (row) => row.seconds + "초",
    compact: true,
    center: true,
  },
  {
    id: "time",
    name: "사용일",
    selector: (row) => dayjs(row.created).format("YYYY. MM. DD. dddd. HH:mm"),
    compact: true,
    center: true,
  },
];

export default function UseHistory() {
  const { user } = useUser();
  const { data, isLoading, isError, error } = useQuery(
    ["usage"],
    () => fetchUsage(user),
    { keepPreviousData: true }
  );
  dayjs.locale("ko");

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
        <div className="flex items-center justify-center flex-col bg-white">
          <DataTable
            columns={columns}
            data={data?.data}
            pagination
            paginationComponentOptions={{
              rowsPerPageText: "페이지당 행 수:", // rowsPerPageText 옵션은 유지하면서
              rangeSeparatorText: "of", // rangeSeparatorText도 유지하면서
              noRowsPerPage: true, // rowsPerPageOption을 없애기 위해 noRowsPerPage를 true로 설정
              // rowsPerPageOption은 빈 배열로 설정해서 숨기기
              rowsPerPageOption: [],
            }}
          />
        </div>
      </div>
    </>
  );
}
