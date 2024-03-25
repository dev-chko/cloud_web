import React from "react";
import { useUser } from "../auth/useUser";
import { useQuery } from "react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { getStoredUser } from "../user-storage";
import { useNavigate } from "react-router-dom";

const fetchGoods = async () => {
  const response = await fetch("/api/v1/goods");
  return response.json();
};

// const Goods_example = [
//   {
//     gIdx: 1,
//     name: "5천원",
//     amount: "5000",
//     point: "5000",
//     created: "2022-12-22T04:30:40.000Z",
//   },
// ];

// const pay_response = {
//   apply_num: "00164649",
//   bank_name: null,
//   buyer_addr: "",
//   buyer_email: "oko0412o@gmail.com",
//   buyer_name: "",
//   buyer_postcode: "",
//   buyer_tel: "01094216250",
//   card_name: "현대카드",
//   card_number: "40457700****9900",
//   card_quota: 0,
//   currency: "KRW",
//   custom_data: null,
//   imp_uid: "imp_087620880499",
//   merchant_uid: "min_1672368620154",
//   name: "고창희",
//   paid_amount: 5000,
//   paid_at: 1672368740,
//   pay_method: "card",
//   pg_provider: "nice",
//   pg_tid: "nictest00m01012212301152208684",
//   pg_type: "payment",
//   receipt_url:
//     "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest00m01012212301152208684&type=0&InnerWin=Y",
//   status: "paid",
//   success: true,
// };

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    data: Goods,
    isLoading,
    isError,
  } = useQuery(["goods"], fetchGoods, {
    keepPreviousData: true,
  });

  const toast = useToast({
    isClosable: true,
    variant: "subtle",
    position: "bottom",
  });

  function callback(response, index) {
    const accessToken = getStoredUser();
    if (response.success) {
      axios({
        url: "/api/v1/payment/verification",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
        data: {
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid,
        },
      }).then((data) => {
        if (Goods?.data[index].amount !== data.data.response.amount) {
          axios({
            url: "/api/v1/payment/success",
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
            data: {
              merchant_uid: response.merchant_uid,
              mIdx: user.mIdx,
              gIdx: Goods?.data[index].gIdx,
              category: response.pay_method,
              result: false,
            },
          });
          const title = `비정상 결제입니다. 관리자에게 문의하세요.`;
          toast({ title, status: "error" });
          throw new Error("비정상 결제입니다.");
        }
        axios({
          url: "/api/v1/payment/success",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
          data: {
            merchant_uid: response.merchant_uid,
            mIdx: user.mIdx,
            gIdx: Goods?.data[index].gIdx,
            catagory: response.pay_method,
            result: response.success,
          },
        }).then((response_data) => {
          if (response_data.status === 200) {
            const title = "결제 완료";
            toast({ title, status: "info" });
            navigate(`/recharge`);
          } else {
            console.log("Error :>> ", Error);
          }
        });
      });
    } else {
      const title = `${response.error_msg}`;
      toast({ title, status: "error" });
    }
  }

  const onClickPayment = (e, index) => {
    e.preventDefault();

    const { IMP } = window;
    IMP.init("imp00488851");

    const pgParams = {
      pg: `danal_tpay.${
        process.env.NODE_ENV === "development" ? "9810030929" : "A010012814"
      }`,
      pay_method: "card",
      merchant_uid: `min_${new Date().getTime()}`,
      name: `CloudPC ${Goods?.data[index].point} 포인트`,
      amount: Goods?.data[index].amount,
      buyer_tel: `${user.mobile}`,
      buyer_name: `${user.name}`,
      buyer_email: `${user.email}`,
    };

    IMP.request_pay(pgParams, (response) => callback(response, index));

    //
  };

  if (isLoading) {
    <div> loading...</div>;
  }

  if (isError) {
    <div> Opps... Error </div>;
  }
  return (
    <div className="mt-36 max-w-7xl container grid items-center justify-center">
      <div id="header" className="text-center ">
        <div>상품안내</div>
      </div>
      <div
        id="contents"
        className="grid grid-cols-1 gap-5 items-center md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3"
      >
        {Goods?.data.map((items, index) => {
          return (
            <div className="md:w-[240px] lg:w-[320px] md:h-[240px] sm:w-[340px] sm:h-[120px] w-[280px] rounded-lg bg-stone-400 border-sky-600 mx-10">
              <div name="amount" value={items.amout}>
                금액 {items.amount}
              </div>
              <div>포인트 : {items.point}</div>
              <div>시간: {items.intime}</div>
              <button onClick={(e) => onClickPayment(e, index)}>구매</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
