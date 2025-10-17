import Image from "next/image";
import { useState } from "react";
import Notice from "../../components/Notice";
import { CreateAccount } from "../../components/Api";
export default function Home() {
  const [FormData, SetFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [Message, SetMessage] = useState({
    is_open: true,
    status: "",
    message: "",
  });

  const handleSubmit = async () => {
    let response = await CreateAccount(FormData);
    console.log(response);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <section className="w-2/5 rounded-sm mt-14 border shadow gap-2 p-3">
        <div className="w-full py-1 px-1 capitalize text-center flex  flex-col items-center">
          <h2> wallet transfer</h2>
        </div>
        <section className="w-full flex flex-col items-center px-3 mt-2">
          <div className="w-full text-left capitalize  px-2">First name</div>
          <div className="w-full px-2">
            <input
              type="text"
              value={FormData.firstname}
              className="w-full p-2"
              placeholder="Please Enter First Name"
              onChange={(e) =>
                SetFormData({ ...FormData, firstname: e.target.value })
              }
            />
          </div>
        </section>

        <section className="w-full flex flex-col items-center px-3 mt-2">
          <div className="w-full text-left capitalize  px-2">Last name</div>
          <div className="w-full px-2">
            <input
              type="text"
              value={FormData.firstname}
              className="w-full p-2"
              placeholder="Please Enter Last Name"
              onChange={(e) =>
                SetFormData({ ...FormData, lastname: e.target.value })
              }
            />
          </div>
        </section>

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
              value={FormData.email}
              className="w-full p-2"
              placeholder="Please Enter Password"
              onChange={(e) =>
                SetFormData({ ...FormData, password: e.target.value })
              }
            />
          </div>
        </section>
        <div className="w-full mt-2 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="text-base capitalize bg-blue-400 text-white text-center font-semibold p-2 m-auto w-11/12 rounded-sm">
            Submit
          </button>
        </div>
      </section>
      <section className="w-2/5 flex flex-col ">
        <div className="w-full flex flex-row items-center justify-center capitalize space-x-1">
          <span className="text-sm font-medium text-black">
            i already have an account click here to
          </span>
          <span className="text-blue-400 text-sm font-medium">login</span>
        </div>
      </section>
      <Notice Message={Message} SetMessage={SetMessage} />
    </div>
  );
}
