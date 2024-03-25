import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useUser } from "../../auth/useUser";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderDrop(props) {
  const navigate = useNavigate();
  const { user } = useUser();
  const auth = useAuth();
  const Mynavigation = [
    { id: `/user`, name: "내정보", key: 10 },
    { id: "/recharge", name: "충전내역", key: 20 },
    { id: "/usagehistory", name: "사용내역", key: 30 },
    { id: "/inquiry", name: "1:1문의", key: 40 },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {user?.name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-center">
            {Mynavigation.map((items) => {
              return (
                <Menu.Item key={items.key}>
                  {({ active }) => (
                    <a
                      href={items.id}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {items.name}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>

          <div className="py-1 text-center">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    navigate(`/signin`);
                    auth.signout();
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  로그아웃
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
