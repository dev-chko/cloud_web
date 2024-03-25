import { useState } from "react";
import { useUser } from "../../auth/useUser";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../user-storage";
import axios from "axios";

const fetchGoods = async () => {
  const response = await fetch("/api/v1/goods");
  return response.json();
};

export default function ChargePlans(history) {
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    data: Goods,
    isLoading,
    isError,
    error,
  } = useQuery(["goods"], fetchGoods, {
    keepPreviousData: true,
  });

  //아임포트 설정
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
        if (Goods?.data[index].amount != data.data.response.amount) {
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
          }).then(() => {
            const title = `비정상 결제입니다. 관리자에게 문의하세요.`;
            toast({ title, status: "error" });
            throw new Error("비정상 결제입니다.");
          });
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
            point: Goods?.data[index].point,
            category: response.pay_method,
            result: response.success,
          },
        }).then((response_data) => {
          if (response_data.status === 200) {
            const title = "결제 완료";
            toast({ title, status: "info" });
            axios({
              url: "/api/v1/point",
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken.accessToken}`,
              },
              data: {
                mIdx: user.mIdx,
                balance: response.amount,
              },
            });
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
      escrow: false,
      merchant_uid: `min_${new Date().getTime()}`,
      name: `CloudPC ${Goods?.data[index].point} 포인트`,
      amount: Goods?.data[index].amount,
      buyer_tel: `${user.mobile}`,
      buyer_name: `${user.name}`,
      buyer_email: `${user.email}`,
    };

    IMP.request_pay(pgParams, (response) => callback(response, index));
  };

  return (
    <>
      <div
        id="plan"
        className="md:max-w-7xl md:w-full w-[300px] container md:pt-40 pt-20 scroll-smooth"
      >
        <p className="font-bold text-[40px] text-center text-[#003b55] mt-[160px] mb-[40px] leading-snug tracking-wide">
          요금제
        </p>
        <div className="flex flex-col justify-around md:justify-evenly md:flex-row">
          {Goods?.data.map((items, index) => {
            return (
              <div key={items.id + "-" + index} className="flex justify-center">
                <div className="w-[190px] transition duration-200 overflow-hidden bg-[url('/src/assets/images/element_charge.svg')] bg-cover my-5">
                  <div className="w-full justify-center flex flex-col items-center h-full ">
                    {/* <h3 className="font-bold text-[34px] text-gray-700 w-[130px] text-right md:mt-10 cursor-default text-lg">
                      {parseInt(items?.amount||0).toLocaleString()}
                    </h3> */}
                    <h3 className="font-bold text-[32px] text-[#003b55] w-[130px] text-left md:mt-12 cursor-default text-lg">
                      {items.name}
                    </h3>
                    <p className="text-[18px] text-[#003b55] mt-[3px] w-[130px] text-left">
                      이용권
                    </p>
                    <div className="text-center md:pt-[5px]">
                      <p className="font-bold text-[32px] text-[#2672ff] cursor-default w-[130px] h-[42px] text-right">
                        {parseInt(items.point || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center md:p-[5px] bg-[#d1388c] rounded-[8px] text-[#f1ea57] w-[60px] font-bold mb-3 self-end mr-[32px]">
                      Point
                    </div>
                    <div className="w-[167px] p-3 bg-[#2672ff] rounded-b-[10px] justify-center">
                      {user ? (
                        <button
                          className="bg-[#2254b1] hover:bg-black-600 w-full h-[46px] text-center text-[20px] font-bold text-white focus:outline-none rounded-[8px]"
                          onClick={(e) => onClickPayment(e, index)}
                        >
                          구매
                        </button>
                      ) : (
                        <a href="/signin">
                          <button className="bg-[#2254b1] hover:bg-black-600 w-full h-[46px] text-center text-[20px] font-bold text-white focus:outline-none rounded-[8px]">
                            구매
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
