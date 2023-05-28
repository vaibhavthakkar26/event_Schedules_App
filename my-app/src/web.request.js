import axios from "axios";

export const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log("responseMain",response);
    if(response.data.success){
        return {
            success: response.data.success,
            data : response.data.data,
            message : response.data.message
        }
    }else{
        return {
            success: response.data.success,
            data : response.data.data,
            message : response.data.message
        }
    }
    // if (response.data.code === 200) {

    // } else {
    // }
    return response;
  } catch (error) {
    // errorToast(error);
    return console.error(error);
  }
};

export const get = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};


export const put = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    // if (response.data.code === 200) {
    //   successToast(response.data.message);
    // } else {
    //   errorToast(response.data.message);
    // }
    return response;
  } catch (error) {
    // errorToast(error);
    return console.error(error);
  }
};
