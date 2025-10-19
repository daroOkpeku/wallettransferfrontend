import axios from "axios";
import { useEffect } from "react";
import { store } from "../components/state/context";
let user_login = "";
// const state = store.getState();
// const tokenx = state.userData?.userinfo?.data?.token;
// console.log(tokenx);
if (typeof window !== "undefined") {
  // This code runs only in the browser
  const stored = localStorage.getItem("user_login");
  user_login = stored ? JSON.parse(stored) : "";
}

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const baseURL = "http://127.0.0.1:8000";
const CreateAccount = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization":"Bearer "+token,
  };
  let formdata = new FormData();
  formdata.append("firstname", data.firstname);
  formdata.append("lastname", data.lastname);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  try {
    const response = await axios.post(`${baseURL}/api/register`, formdata, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const verifyemail = async (verificationCode) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/verify_email/?verification=${encodeURIComponent(
        verificationCode
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response.data };
    } else {
      return { error: true, message: "Network error or server not reachable" };
    }
  }
};

const Signin = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization":"Bearer "+token,
  };
  let formdata = new FormData();
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  try {
    const response = await axios.post(`${baseURL}/api/login`, formdata, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const FundAccount = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + user_login?.token,
  };

  let formdata = new FormData();
  formdata.append("amount", data.amount);
  try {
    // fundwallet
    const response = await axios.post(`${baseURL}/api/fundwallet`, formdata, {
      headers,
    });
    return response.data;
  } catch (error) {
    //console.error("Error creating account:", error);
    return error;
  }
};

const WalletInfo = async () => {
  if (user_login) {
    try {
      const response = await axios.get(`${baseURL}/api/wallet`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user_login?.token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: true, ...error.response.data };
      } else {
        return {
          error: true,
          message: "Network error or server not reachable",
        };
      }
    }
  }
};

const WalletTransfer = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + user_login?.token,
  };

  let formdata = new FormData();
  formdata.append("amount", data.amount);
  formdata.append("receiver_id", data.receiver_id);
  try {
    const response = await axios.post(
      `${baseURL}/api/wallettransfer`,
      formdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    //console.error("Error creating account:", error);
    return error;
  }
};

const FectchUsersList = async () => {
  if (user_login) {
    try {
      const response = await axios.get(`${baseURL}/api/fectchuserslist`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user_login?.token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: true, ...error.response.data };
      } else {
        return {
          error: true,
          message: "Network error or server not reachable",
        };
      }
    }
  }
};

const FectchUserData = async () => {
  if (user_login && user_login?.token) {
    try {
      const response = await axios.get(`${baseURL}/api/fetchuserdata`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user_login?.token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: true, ...error.response.data };
      } else {
        return {
          error: true,
          message: "Network error or server not reachable",
        };
      }
    }
  }
};

const FectchTransactionData = async (number) => {
  if (user_login) {
    try {
      const response = await axios.get(
        `${baseURL}/api/transaction?page=${number}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + user_login?.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: true, ...error.response.data };
      } else {
        return {
          error: true,
          message: "Network error or server not reachable",
        };
      }
    }
  }
};

const FectchLogout = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/logout`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user_login?.token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: true, ...error.response.data };
    } else {
      return { error: true, message: "Network error or server not reachable" };
    }
  }
};

const ForgotPassword = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization":"Bearer "+token,
  };
  let formdata = new FormData();
  formdata.append("email", data.email);
  try {
    const response = await axios.post(
      `${baseURL}/api/forgot_password`,
      formdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// const formData = new FormData();
// formData.append("password", password);
// formData.append("password_confirmation", passwordConfirmation);

const ResetPassword = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization":"Bearer "+token,
  };
  let formdata = new FormData();
  formdata.append("code", data.code);
  formdata.append("password", data.password);
  formdata.append("password_confirmation", data.password_confirmation);
  try {
    const response = await axios.post(
      `${baseURL}/api/reset_password`,
      formdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const EditProfileData = async (data) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + user_login?.token,
  };

  let formdata = new FormData();
  formdata.append("firstname", data.firstname);
  formdata.append("lastname", data.lastname);
  formdata.append("_method", "PUT");
  try {
    const response = await axios.post(`${baseURL}/api/editprofile`, formdata, {
      headers,
    });
    return response.data;
  } catch (error) {
    //console.error("Error creating account:", error);
    return error;
  }
};

const EditProfileUplodeImage = async (data) => {
  let headers = {
    // "Content-Type": "application/json",
    // Accept: "application/json",
    Authorization: "Bearer " + user_login?.token,
  };

  let formdata = new FormData();
  formdata.append("image", data.image);
  try {
    const response = await axios.post(
      `${baseURL}/api/uploadprofileimage`,
      formdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    //console.error("Error creating account:", error);
    return error;
  }
};

const FectchUserImage = async () => {
  if (user_login && user_login?.token) {
    try {
      const response = await axios.get(`${baseURL}/api/profileImage`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user_login?.token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return { error: true, ...error.response.data };
      } else {
        return {
          error: true,
          message: "Network error or server not reachable",
        };
      }
    }
  }
};
export {
  CreateAccount,
  verifyemail,
  Signin,
  FundAccount,
  WalletInfo,
  WalletTransfer,
  FectchUsersList,
  FectchUserData,
  FectchTransactionData,
  FectchLogout,
  ForgotPassword,
  ResetPassword,
  EditProfileData,
  EditProfileUplodeImage,
  FectchUserImage,
};
