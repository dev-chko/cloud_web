import react from "react";
// import { ReactComponent as MainMobile } from "../../assets/images/Download_Mobile.svg";
// import { ReactComponent as MainPC } from "../../assets/images/Download_PC.svg";
import { ReactComponent as MainPC } from "../../assets/images/icn-desktop.svg";
import { ReactComponent as MainMobile } from "../../assets/images/icn-mobile.svg";

export default function Download() {
  return (
    <div
      id="download"
      className="h-full bg-[#e4f0f4] flex justify-center items-start mb-[320px] md:pt-40 pt-20"
    >
      <div className="flex md:flex-row flex-col justify-around items-start text-center bg-[#e4f0f4]">
        <div className="min-w-[183px] font-bold text-[40px] mt-[260px] text-[#003b55]">
          <div>Download</div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-center items-center bg-white text-[#003b55] hover:bg-[#e463aa] hover:text-[#f1ea57] hover:fill-white shadow rounded-[12px] md:w-[320px] h-[300px] mt-[28px] mr-7">
              <MainPC className="md:w-[140px] md:h-[105px] w-[140px] h-[105px] mt-[22px]" />
              <p className="text-[16px] md:text-[16px] mt-[30px]">
                Download for
              </p>
              <p className="text-[34px] md:text-[34px]">
                Desktop
              </p>
            </div>
            <div className="flex flex-col justify-center items-center bg-white text-[#003b55] hover:bg-[#e463aa] hover:text-[#f1ea57] hover:fill-white shadow rounded-[12px] md:w-[320px] h-[300px] mt-[28px]">
              <MainMobile className="md:w-[56px] md:h-[105px] w-[56px] h-[105px] mt-[22px]" />
              <p className="text-[16px] md:text-[16px] mt-[30px]">
                Download for
              </p>
              <p className="text-[34px] md:text-[34px]">
                Mobile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
