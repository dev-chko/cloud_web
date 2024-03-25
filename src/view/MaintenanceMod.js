import { ReactComponent as Service } from "../assets/images/readyForService.svg";

const PageNotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <Service width="320" height="300" fill="#fff" alt="점검중" />
      <h1 className="flex text-2xl text-white tracking-widest">
        <p className="font-extrabold">서비스 점검중</p>입니다.
        <br />
      </h1>
      <div className="text-white tracking-widest">
        <p>보다 나은 서비스 제공을 위하여 점검중입니다.</p>
      </div>
    </main>
  );
};

export default PageNotFound;
