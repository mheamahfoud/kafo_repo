
import http from "../common/common-http";
import { notify } from '../common/error_msg';
export const GetRequests = async (lang) => {

   const response = await http.post('get_requests', {
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


export const AcceptRequest = async (values) => {
   const response = await http.post('accetp_request', {
      ...values
   });
   return await response.data;
};

export const RejectRequest = async (values) => {
   const response = await http.post('reject_request', {
      ...values
   });
   return await response.data;
};


export const ChargeWallet = async (values) => {
   const response = await http.post('charge_wallet', {
      ...values
   });
   return await response.data;
};

