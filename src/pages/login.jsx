import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { Signin } from "../../components/Api";
import { useRouter } from "next/router";
import { setUserData } from "../../components/reducer/userdata.reducer";
import { useDispatch } from "react-redux";
export default function login() {
  const [FormData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [isProcessing, SetisProcessing] = useState(false);
  const [Message, SetMessage] = useState({
    is_open: false,
    status: "",
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    let user_login = localStorage.getItem("user_login")
      ? JSON.parse(localStorage.getItem("user_login"))
      : "";

    if (user_login) {
      // router.replace({ pathname: "home" });
      window.location.href = window.location.origin + "/home";
    }
  }, []);

  const handleSubmit = async () => {
    console.log(FormData);
    SetisProcessing(true);
    let response = await Signin(FormData);
    console.log(response);
    if (response.word) {
      localStorage.setItem("user_login", JSON.stringify(response.data));
      sessionStorage.setItem("reload_home", "true");
      dispatch(
        setUserData({
          userinfo: {
            data: response.data,
          },
        })
      );

      SetisProcessing(false);
      SetMessage({
        is_open: true,
        status: "success",
        message: response.word,
      });

      setTimeout(() => {
        router.replace({ pathname: "home" });
      }, 2000);
    }
    if (response.status == 422) {
      SetisProcessing(false);
      SetMessage({
        is_open: true,
        status: "error",
        message: response.response.data.message,
      });
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <section className=" w-10/12 sm:w-10/12 md:w-2/5  lg:w-2/5 rounded-sm mt-14 shadow-md gap-2 p-3">
        <div className="w-full py-1 px-1 capitalize text-center flex  flex-col items-center">
          <h2> wallet transfer</h2>
        </div>

        <section className="w-full flex flex-col items-center px-3 mt-2">
          <div className="w-full text-left capitalize  px-2">Email</div>
          <div className="w-full px-2">
            <input
              type="email"
              value={FormData.email}
              className="w-full p-2"
              placeholder="Please Enter Email"
              onChange={(e) =>
                SetFormData({ ...FormData, email: e.target.value })
              }
            />
          </div>
        </section>

        <section className="w-full flex flex-col items-center px-3 mt-2">
          <div className="w-full text-left capitalize  px-2 font-medium">
            Password
          </div>
          <div className="w-full px-2">
            <input
              type="password"
              value={FormData.password}
              className="w-full p-2"
              placeholder="Please Enter Password"
              onChange={(e) =>
                SetFormData({ ...FormData, password: e.target.value })
              }
            />
          </div>
        </section>
        <section className="w-full  ">
          <span
            className=" float-right w-1/3 cursor-pointer "
            onClick={() => router.replace({ pathname: "forgotten" })}>
            forgotten password
          </span>
        </section>
        <div className="w-full mt-2 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="text-base capitalize bg-blue-400 text-white text-center font-semibold p-2 m-auto w-11/12 rounded-sm">
            {isProcessing ? "Please Wait.." : "Submit"}
          </button>
        </div>
      </section>
      <section className="w-2/5 flex flex-col ">
        <div className="w-full flex flex-row items-center justify-center capitalize space-x-1">
          <span className="text-sm font-medium text-black">
            i dont have an account
          </span>
          <span
            onClick={() => router.replace({ pathname: "/" })}
            className="text-blue-400 text-sm font-medium cursor-pointer ">
            Signup
          </span>
        </div>
      </section>
      <Notice Message={Message} SetMessage={SetMessage} />
    </div>
  );
}
