import React, { useState } from "react";

export default function Mynavigation({ user }) {
  const Mynavigation = [
    { id: `/user`, name: "내정보", idx: 1 },
    { id: "/recharge", name: "충전내역", idx: 2 },
    { id: "/usagehistory", name: "사용내역", idx: 3 },
    { id: "/inquiry", name: "1:1문의", idx: 4 },
  ];

  const [activeNav, setActiveNav] = useState(1);

  return (
    <div className="">
      <div className="flex flex-col-reverse items-center justify-around mx-lg  border-b md:flex-row h-24 md:h-32">
        <p className="text-4xl">마이 페이지</p>
      </div>
      <nav className="flex justify-center space-x-4">
        {Mynavigation.map((items, inx) => (
          <a
            href={items.id}
            key={items.name}
            className={`${
              activeNav === inx ? "active:bg-blue-900" : ""
            } rounded-lg px-3 py-2 text-slate-700 font-medium md:text-lg text-xs hover:bg-slate-100 hover:text-slate-900`}
          >
            {items.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
