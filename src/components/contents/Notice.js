import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import Pagination from "../tools/Pagination";
import { useQuery, useQueryClient } from "react-query";

const fetchNotice = async (page) => {
  const response = await fetch(
    `/api/v1/boards?category=notice&perPage=5&page=${page}&sort=asc`
  );
  return response.json();
};

export default function Notice() {
  const [currentpage, setCurrentpage] = useState(1);
  const [total, setTotal] = useState(0);
  const { data, isLoading, isError, error } = useQuery(
    ["notice", currentpage],
    () => fetchNotice(currentpage),
    {
      keepPreviousData: true,
    }
  );

  const limit = 5;
  const queryClient = useQueryClient();

  useEffect(() => {
    setTotal(data?.totalRows);

    if (currentpage < total) {
      const nextPage = currentpage + 1;
      queryClient.prefetchQuery(["notice", nextPage], () =>
        fetchNotice(nextPage)
      );
    }
  }, [currentpage, queryClient]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3> Error!! {error} </h3>;

  return (
    <>
      <div
        id="notice"
        className=" flex flex-col justify-center md:pt-40  pt-20 scroll-smooth"
      >
        <div className="text-center container">
          <p className="font-bold text-[40px] text-[#003b55] mt-[160px] mb-[40px] leading-snug tracking-wide">
            공지사항
          </p>
        </div>
        <div className="rounded-4xl px-4 ">
          <>
            {data.data.map(({ subject, body, bIdx }) => (
              <Disclosure key={bIdx}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="flex justify-between w-full px-2 py-2 my-2 text-xl font-medium text-left items-center bg-white rounded-[10px] text-[#003b55] hover:bg-[#d0f1ff] focus:outline-none focus-visible:ring focus-visible:ring-purple-100 focus-visible:ring-opacity-75"
                      key={bIdx}
                    >
                      <span className="m-3">{subject}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.0}
                        stroke="currentColor"
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-[#9ec0ce] mr-2`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg mb-5">
                      {body}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
            <Pagination
              total={data.totalRows}
              limit={limit}
              page={currentpage}
              setPage={setCurrentpage}
            />
          </>
        </div>
      </div>
    </>
  );
}
