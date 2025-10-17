import axios from "axios";
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const baseURL = "http://127.0.0.1:8000";
const CreateAccount = async (FormData, SetFormData) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization":"Bearer "+token,
  };
  let formdata = new FormData();
  formdata.append("firstname", FormData.firstname);
  formdata.append("lastname", FormData.lastname);
  formdata.append("email", FormData.email);
  formdata.append("password", FormData.password);
  try {
    const response = await axios.post(`${baseURL}/api/${url}`, formdata, {
      headers,
    });
    return response.data;
  } catch (error) {
    //console.error("Error creating account:", error);
    return error;
  }
};

export { CreateAccount };
