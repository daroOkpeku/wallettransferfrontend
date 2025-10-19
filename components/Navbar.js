import React from "react";
import { FectchLogout } from "./Api";
import { useRouter } from "next/router";
export default function Navbar(props) {
  //  Message={Message}  SetMessage={SetMessage}
  let { Message, SetMessage } = props;
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // FectchLogout
      const response = await FectchLogout();
      console.log(response);
      if (response.word) {
        localStorage.removeItem("user_login");
        SetMessage({
          is_open: true,
          status: "success",
          message: response.word,
        });
        setTimeout(() => {
          // router.replace({ pathname: "/" });
          window.location.href = window.location.origin;
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div className="w-full px-3 py-3  items-center">
      <section className=" w-11/12  m-auto flex flex-row justify-between items-center">
        <span className="text-base capitalize text-black font-medium">
          Wallet Transfer
        </span>

        <button
          onClick={handleLogout}
          className=" w-1/12 bg-blue-500 text-white rounded-md py-2 text-base font-medium">
          logout
        </button>
      </section>
    </div>
  );
}
