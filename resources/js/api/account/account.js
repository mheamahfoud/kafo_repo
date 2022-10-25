import http from "../common/common-http";
import { notify } from '../common/error_msg';
export const ChangeLanguage = async (lang) => {
  await http.post('changeLanguage', {
    'lang': lang
  });
  // return await response.data;
};



export const Logout = async () => {
  const response = await http.post('logout_user', {

  });
  return response.data;
};

export const CheckAuth = async () => {
  const response = await http.post('checkAuth', {

  });
  
  return response.data
  // if (response.data.success) {
  //  // return response.data
  //   notify(response.data.data)
  // }
  // else {
  //   notify(response.data.error_description)
  // }

};










