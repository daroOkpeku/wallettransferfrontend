import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FectchUserData, EditProfileData } from "../Api";
function EditProfile(props) {
  let { OpenEditProfile, SetOpenEditProfile, SetUserdata } = props;

  const [FormData, SetFormData] = useState({
    firstname: "",
    lastname: "",
  });
  const [Message, SetMessage] = useState({
    is_open: false,
    status: "",
    message: "",
  });
  const [isProcessing, SetisProcessing] = useState(false);

  const handleSubmit = async () => {
    // console.log(FormData);
    SetisProcessing(true);
    // SetFormData({ ...FormData, token: Token }); EditProfile
    let response = await EditProfileData(FormData);
    console.log(response);

    if (response?.word) {
      SetisProcessing(false);
      SetMessage({
        is_open: true,
        status: "success",
        message: response.word,
      });

      try {
        const response = await FectchUserData();
        if (response?.data) {
          const storedUser = localStorage.getItem("user_login");
          const userLogin = storedUser ? JSON.parse(storedUser) : null;

          const userObject = {
            email: response.data.email,
            firstname: response.data.firstname,
            id: response.data.id,
            lastname: response.data.lastname,
            token: userLogin?.token,
          };

          SetUserdata(userObject);
          setTimeout(() => {
            localStorage.setItem("user_login", JSON.stringify(userObject));
          }, 6000);
        }
      } catch (err) {
        console.log(err);
      }
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
    <div
      className={
        OpenEditProfile
          ? "w-full h-full fixed top-0 left-0  z-50  bg-neutral-500/10 flex items-center justify-center"
          : "hidden"
      }>
      <section className="bg-white rounded-md w-10/12 sm:w-3/5 md:w-1/2 lg:w-[55%] mt-10 flex flex-col items-center gap-4 py-4">
        <div className="w-full flex flex-col items-center gap-2">
          <section className="w-full  px-3">
            <span
              onClick={() => SetOpenEditProfile(false)}
              className="w-6 h-6 rounded-full float-right">
              <IoMdCloseCircleOutline
                onClick={() => SetOpenEditProfile(false)}
                className="w-full h-full "
              />
            </span>
          </section>
          <article
            className={`w-11/12 m-auto text-center font-sans rounded-md py-2 border
                    ${
                      Message && Message.is_open
                        ? Message.status === "success"
                          ? "text-green-500 border-green-500"
                          : "text-red-500 border-red-500"
                        : "hidden"
                    }
                    `}>
            {Message && Message.message ? Message.message : ""}
          </article>
          <article className="w-11/12 m-auto ">
            <input
              type="text"
              value={FormData.firstname}
              onChange={(e) =>
                SetFormData({ ...FormData, firstname: e.target.value })
              }
              placeholder="enter firstname"
              className="w-full py-2 rounded-sm p-1 outline"
            />
          </article>

          <article className="w-11/12 m-auto ">
            <input
              type="text"
              value={FormData.lastname}
              onChange={(e) =>
                SetFormData({ ...FormData, lastname: e.target.value })
              }
              placeholder="enter lastname"
              className="w-full py-2 rounded-sm p-1 outline"
            />
          </article>

          <div className="w-full mt-2 flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="text-base capitalize bg-blue-400 text-white text-center font-semibold p-2 m-auto w-11/12 rounded-sm">
              {isProcessing ? "Please Wait.." : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
