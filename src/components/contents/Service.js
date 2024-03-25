import React from "react";
import { ReactComponent as Main2 } from "../../assets/images/frame6.svg";
import { ReactComponent as Main3 } from "../../assets/images/conceptOfRemoteTeam.svg";
import { ReactComponent as Main4 } from "../../assets/images/frontendDesigner.svg";
import { ReactComponent as Main5 } from "../../assets/images/developerTeam.svg";

export default function Service() {
  return (
    <div className="w-full h-full">
      {/* 첫장 */}
      <div id="service" className="flex-col items-center justify-around mt-24 bg-[url('/src/assets/images/service_main_02.svg')] bg-no-repeat bg-contain bg-center h-[900px]">
        {/* <div className="bg-[url('/src/assets/images/service_main_02.svg')] bg-no-repeat w-full"> */}
          <div className="ml-auto">
            <div className="font-bold text-[40px] md:text-[36px] leading-snug tracking-tight text-[#003b55]"> 언제 어디서나, 어떤 디바이스에서든<br /> 다양한 콘텐츠를 이용해보세요. </div>
            <div className="pt-10 font-bold text-[40px] md:text-[25px] leading-snug tracking-tight text-[#003b55]"> Grinbit Cloud PC </div>
            <div className="pt-2 text-[40px] md:text-[20px] leading-snug tracking-tight text-[#003b55]"> 고사양 PC를 보유한 PC방의 인프라를 클라우드 방식으로 제공하는<br /> 플랫폼 서비스로 고사양 게임, OTT 서비스 등의 다양한 콘텐츠를<br /> 시간과 공간의 제약없이 자유롭게 이용하실 수 있습니다. </div>
            <a href="#download">
              <button className="font-bold outline outline-2 hover:outline-2 hover:outline-yellow-300 m-10 w-[140px] h-[60px] hidden md:text-[20px] rounded-[14px] md:inline-block bg-pink-600 text-white text-base hover:text-yellow-300">
                Download
              </button>
            </a>
          </div>
        {/* </div> */}
      </div>

      {/* 둘째장 */}
      <div className="flex flex-col items-center justify-around pt-10 md:pt-12 md:flex-row ">
        <div className="">
          <Main2 title="main2P" className="w-[320px] lg:w-[700px]" />
        </div>
        <div className="py-5">
          <p className="font-bold text-[40px] md:text-[36px] text-[#003b55]">
            저사양 PC도 OK!
            <br />
            모바일도 OK!
          </p>
          <p className="text-[20px] text-[#003b55] pt-5 leading-snug tracking-tight sm:max-w-[320px] md:max-w-none">
            PC방의 PC 성능 그대로 쉽고 빠르게
            <br />
            딜레이 없이 쾌적하게 즐기는 클라우드 스트리밍 서비스!
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center justify-around pt-10 md:pt-10  md:flex-row ">
        <div className="flex flex-col py-5 min-w-max md:min-w-0 ">
          <p className="font-bold text-[40px] text-[#003b55] leading-snug tracking-tight max-w-[320px] md:max-w-none">
            언제 어디서나, 쉽고 빠르게!
          </p>
          <p className="text-[20px] pt-5 text-[#003b55] leading-snug tracking-tight">
            인터넷만 가능하다면
            <br />
            PC방에 가지 않아도
            <br /> 컴퓨터, 모바일만 있다면 모두 OK!
          </p>
        </div>
        <div>
          <Main3 className="w-[320px] lg:w-[620px]" />
        </div>
      </div>

      {/* 셋째장 */}
      <div className="flex flex-col-reverse items-center justify-around pt-10  md:flex-row-reverse ">
        <div className="flex flex-col py-5 min-w-max md:min-w-0">
          <p className="font-bold text-[40px] text-[#003b55] leading-snug tracking-tight">
            집에서 누리는
            <br />
            PC방 프리미엄 혜택!
          </p>
          <p className="text-[20px] pt-5 text-[#003b55] leading-snug tracking-tight max-w-[320px] md:max-w-none">
            PC방에서만 받을 수 있었던 다양한 혜택들을
            <br />
            Cloud PC로 집에서 편하게 누려보세요!
          </p>
        </div>
        <div className="">
          <Main4 className="w-[320px] lg:w-[620px]" />
        </div>
      </div>
      <div className="flex flex-col-reverse items-center justify-around pt-10 md:pt-10 md:flex-row">
        <div className="flex flex-col py-5 min-w-max md:min-w-0">
          <p className="font-bold text-[40px] text-[#003b55] leading-snug tracking-tight max-w-[320px] md:max-w-none">
            애플에서도 사용 가능!
          </p>
          <p className="text-[20px] text-base w-95 pt-5 md:text-lg">
            애플 기기에서 게임 즐기기 어려우셨죠?
            <br />
            CLOUD PC 있다면 애플 디바이스에서도
            <br /> PC방 서비스 이용이 가능합니다.
          </p>
        </div>
        <div className="">
          <Main5 className="w-[320px] lg:w-[620px]" />
        </div>
      </div>
    </div>
  );
}
