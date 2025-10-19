import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { ForgotPassword } from "../../components/Api";
import { useRouter } from "next/router";

export default function forgotten() {
  const [FormData, SetFormData] = useState({
    email: "",
  });
  const [isProcessing, SetisProcessing] = useState(false);
  const [Message, SetMessage] = useState({
    is_open: false,
    status: "",
    message: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    console.log(FormData);
    SetisProcessing(true);
    // ForgotPassword
    let response = await ForgotPassword(FormData);

    if (response?.word) {
      SetisProcessing(false);
      SetMessage({
        is_open: true,
        status: "success",
        message: response.word,
      });
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
            className="text-blue-400 text-sm font-medium cursor-pointer">
            Signup
          </span>
        </div>
      </section>
      <Notice Message={Message} SetMessage={SetMessage} />
    </div>
  );
}
