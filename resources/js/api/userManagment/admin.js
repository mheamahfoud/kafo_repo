import http from "../common/common-http";
import { notify } from '../common/error_msg';
export const GetAdmins = async (lang) => {

   const response = await http.post('get_admin', {
   });
   if (
      response.data.success
   ) {
      return response.data
   }
   else {
      notify(response.data.error_description)
   }

};

export const CreateAdmin = async (values) => {
   console.log(values)
   const response = await http.post('create_admin', {
      ...values
   });
   return await response.data;
};

export const UpdateAdmin = async (id, values) => {

   const response = await http.post('update_admin/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateAdmin = async (values) => {
   const response = await http.post('activDeactive_admin', {
      ...values
   });
   return await response.data;
};