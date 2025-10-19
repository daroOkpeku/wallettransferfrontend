import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { CgProfile } from "react-icons/cg";
import imgone from "../../public/296fe121-5dfa-43f4-98b5-db50019738a7.jpg";
import HomeSide from "../../components/Home/HomeSide";
import Main from "../../components/Home/Main";
import Notice from "../../components/Notice";
import { useRouter } from "next/router";

let user_login = "";
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("user_login");
  user_login = stored ? JSON.parse(stored) : "";
}
export default function home() {
  const [Userdata, SetUserdata] = useState(null);
  const [CurrentAmount, SetCurrentAmount] = useState("");
  const router = useRouter();
  useEffect(() => {
    // let user_login = "";
    // if (typeof window !== "undefined") {
    //   const stored = localStorage.getItem("user_login");
    //   user_login = stored ? JSON.parse(stored) : "";
    // }

    SetUserdata(user_login);
    // router.replace({ pathname: "home" });
    // window.location.href = window.location.origin + "/home";
  }, [Userdata, user_login]);

  useEffect(() => {
    if (sessionStorage.getItem("reload_home") === "true") {
      sessionStorage.removeItem("reload_home");
      window.location.reload();
    }
  }, []);
  const [Message, SetMessage] = useState({
    is_open: false,
    status: "",
    message: "",
  });

  return (
    <div className="w-full">
      <Navbar Message={Message} SetMessage={SetMessage} />
      <section className="w-full flex flex-row items-center">
        <HomeSide
          imgone={imgone}
          Userdata={Userdata}
          SetCurrentAmount={SetCurrentAmount}
          CurrentAmount={CurrentAmount}
          SetUserdata={SetUserdata}
        />
        <Main Userdata={Userdata} />
      </section>
      <Notice Message={Message} SetMessage={SetMessage} />
    </div>
  );
}
