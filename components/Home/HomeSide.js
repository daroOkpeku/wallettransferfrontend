import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import FundWallet from "./FundWallet";
import { FectchUserData, WalletInfo, FectchUserImage } from "../Api";
import TransferWallet from "./TransferWallet";
import EditProfile from "./EditProfile";
import UploadImage from "./UploadImage";
export default function HomeSide(props) {
  let { imgone, Userdata, SetCurrentAmount, CurrentAmount, SetUserdata } =
    props;

  const [OpenFundWallet, SetOpenFundWallet] = useState(false);
  const [OpenTransfer, SetOpenTransfer] = useState(false);
  const [OpenEditProfile, SetOpenEditProfile] = useState(false);
  const [OpenUploadeImage, SetOpenUploadeImage] = useState(false);
  const [Picture, SetPicture] = useState(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const response = await WalletInfo();
        // console.log(response);
        if (response.data) SetCurrentAmount(response.data?.current_amount);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchProfile = async () => {
      if (typeof window === "undefined") return; // ensure client-side

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
        console.error("Error fetching profile:", err);
      }
    };

    const fetchuserimage = async () => {
      try {
        const response = await FectchUserImage();
        console.log(response);
        if (response?.word) {
          let pic = response?.url ? response?.url : imgone;
          SetPicture(pic);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // if (Userdata) {
    fetchProfile();
    fetchuserimage();
    fetchWalletInfo();
    // }
  }, []);

  return (
    <div className="w-[25%] h-screen">
      <section className="w-full flex flex-col items-center">
        <span className="w-full flex justify-center items-center">
          <Image
            src={Picture}
            alt="Profile image"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-full"
          />
        </span>
        <div className="w-full flex flex-col item ">
          <section className="w-full px-3 flex flex-row">
            <h3 className="font-medium text-base  font-sans">name:</h3>{" "}
            {Userdata && (
              <h3 className="font-medium text-base  font-sans">
                {" " + Userdata?.lastname + "" + Userdata?.firstname}
              </h3>
            )}
          </section>

          <section className="w-full px-3 flex flex-row">
            <h3 className="font-medium text-base  font-sans">email:</h3>{" "}
            {Userdata && (
              <h3 className="font-medium text-base  font-sans">
                {" " + Userdata?.email}
              </h3>
            )}
          </section>

          <section className="w-full px-3 flex flex-row">
            <h3 className="font-medium text-base  font-sans">amount:</h3>{" "}
            {CurrentAmount && (
              <h3 className="font-medium text-base  font-sans">
                {" " + Math.round(CurrentAmount)}
              </h3>
            )}
          </section>
        </div>

        <div className="w-full flex flex-col item mt-2 px-3 gap-2">
          <span className="font-medium text-base  font-sans capitalize">
            action
          </span>
          <section className="flex flex-row items-center space-x-2">
            <button
              onClick={() => SetOpenFundWallet(true)}
              className="font-medium text-sm capitalize font-sans px-2 py-1 rounded-md bg-green-500 text-white">
              fund wallet
            </button>
            <button
              onClick={() => SetOpenTransfer(true)}
              className="font-medium text-sm  capitalize font-sans px-2 py-1 rounded-md bg-blue-500 text-white ">
              transfer wallet
            </button>
          </section>
          <section className="flex flex-row items-center space-x-2">
            <button
              onClick={() => SetOpenUploadeImage(true)}
              className="font-medium text-sm capitalize font-sans px-2 py-1 rounded-md bg-green-500 text-white">
              Edit Profile
            </button>
          </section>
        </div>
      </section>
      <FundWallet
        OpenFundWallet={OpenFundWallet}
        SetOpenFundWallet={SetOpenFundWallet}
        SetCurrentAmount={SetCurrentAmount}
        CurrentAmount={CurrentAmount}
        Userdata={Userdata}
      />

      <TransferWallet
        OpenTransfer={OpenTransfer}
        SetOpenTransfer={SetOpenTransfer}
        SetCurrentAmount={SetCurrentAmount}
        CurrentAmount={CurrentAmount}
        Userdata={Userdata}
      />

      <EditProfile
        OpenEditProfile={OpenEditProfile}
        SetOpenEditProfile={SetOpenEditProfile}
        SetUserdata={SetUserdata}
      />

      <UploadImage
        OpenUploadeImage={OpenUploadeImage}
        SetOpenUploadeImage={SetOpenUploadeImage}
        SetPicture={SetPicture}
        Picture={Picture}
      />
    </div>
  );
}
