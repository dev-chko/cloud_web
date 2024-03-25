import React from "react";
import { useUser } from "../../auth/useUser";
import Mynavigation from "./Mynavigation";
import { useQuery } from "react-query";
import { getStoredUser } from "../../user-storage";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const fetchPayment = async (user) => {
  if (!user) return null;
  const accessToken = getStoredUser();
  const response = await fetch(`/api/v1/payment/${user?.mIdx}`, {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
  });
  return response.json();
};

export default function ChargeHistory() {
  const { user } = useUser();
  const { data, isLoading, isError, error } = useQuery(
    ["history"],
    () => fetchPayment(user),
    { keepPreviousData: true }
  );
  dayjs.locale("ko");

  const columns = [
    {
      id: "Uid",
      name: "주문번호",
      selector: (row) => row.merchant_uid,
      compact: true,
      center: true,
    },
    {
      id: "amount",
      name: "상품",
      selector: (row) => row.gIdx,
      width: "80px",
    },
    {
      id: "category",
      name: "결제 종류",
      selector: (row) => row.category,
      width: "80px",
      center: true,
    },
    {
      id: "date",
      name: "일자",
      selector: (row) => dayjs(row.created).format("YYYY. MM. DD. dddd. HH:mm"),
      compact: true,
      center: true,
    },
  ];
  const setPerpage = 5;

  if (isLoading)
    return (
      <>
        <div className="mt-20 h-[90rem] container">
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
      <div className="mt-20 min-h-[60rem]">
        <Mynavigation user={user} />
        {/* 마이페이지 내용 */}
        <div className="flex items-center justify-center flex-col bg-white">
          <DataTable
            columns={columns}
            data={data?.data}
            pagination
            // paginationComponentOptions={{ noRowsPerPage: false }}
            paginationPerPage={5}
            paginationTotalRows={data?.data.length}

            // onChangeRowsPerPage={setPerpage}
            // paginationRowsPerPageOptions="5"
          />
        </div>
      </div>
    </>
  );
}
