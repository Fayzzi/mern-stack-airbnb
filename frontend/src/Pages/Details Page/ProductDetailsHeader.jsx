import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Components/Context/UserContext/UserContext";

export default function ProductDetailsHeader() {
  const { user } = useContext(UserContext);
  return (
    <div className="md:-mx-24 lg:-mx-56 -mx-3  p-0 ">
      <header className="flex border-b-[2px] py-5 md:px-24 lg:px-56 px-3 border-b-gray-100 items-center justify-between">
        <div className="">
          <Link
            to={"/"}
            className="flex gap-1 justify-center items-center list-none no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="font-medium text-primary text-[1.4rem]">
              airbnb
            </span>
          </Link>
        </div>
        <div
          className=" hidden md:flex gap-2 hover:shadow-gray-400 transition duration-[200ms]
           border-b-[1px] cursor-pointer shadow-sm shadow-gray-300
            rounded-full py-[5px] px-[9px]"
        >
          <div className="self-center md:text-[.9rem] lg:text-[1.2rem] ml-1 mr-1">
            Anywhere
          </div>
          <div className=" border  border-l-gray-100"></div>
          <div className="self-center md:text-[.9rem] lg:text-[1.2rem] ml-1 mr-1">
            Any week
          </div>
          <div className=" border border-l-gray-100"></div>
          <div className="self-center md:text-[.9rem] lg:text-[1.2rem] ml-1 mr-1">
            Add guest
          </div>

          <button className="bg-primary p-2 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex  hover:shadow-lg  gap-2 border shadow-sm transition duration-[.3sec] shadow-gray-300 rounded-full justify-center items-center p-[6px]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
          <div>
            <Link className="flex gap-2" to={user ? "/account" : "/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="flex self-center">
                {!!user && (
                  <div className="md:text-[.8rem] hidden md:block lg:block lg:text-[1rem]">
                    {user.name}
                  </div>
                )}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
