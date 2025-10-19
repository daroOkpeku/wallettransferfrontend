import React, { useEffect, useState } from "react";
import { verifyemail } from "../../components/Api";
import { useRouter } from "next/router";

export default function verify_email() {
  const [Message, SetMessage] = useState("");

  const router = useRouter();
  const { verification } = router.query;

  useEffect(() => {
    const fetchVerifyEmail = async () => {
      try {
        const response = await verifyemail(verification);
        console.log(response);

        if (response.word) {
          SetMessage(response.word);
        } else if (response.error) {
          SetMessage(response.error);
        }
      } catch (err) {
        console.error(err);
        SetMessage("Something went wrong. Please try again later.");
      }
    };

    if (verification) {
      fetchVerifyEmail();
    }
  }, [verification]);

  return (
    <div className="w-full">
      <section className="w-3/4 m-auto rounded-md shadow-md flex flex-col items-center h-36 gap-7 mt-14">
        <diiv className="w-full text-center font-semibold">
          {Message ? Message : "Please Wait..."}
        </diiv>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => router.replace({ pathname: "login" })}
            className="w-1/3  py-2 rounded-sm m-auto bg-blue-500 text-white outline">
            Click Here to Login
          </button>
        </div>
      </section>
    </div>
  );
}
