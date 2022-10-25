import http from "../common/common-http";

export const GetCiteis = async (lang) => {
   const response = await http.post('get_city', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateCity = async (values) => {
   console.log(values)
   const response = await http.post('create_city', {
      ...values
   });
   return await response.data;
};

export const UpdateCity = async (id, values) => {

   const response = await http.post('update_city/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateCity = async (values) => {
   const response = await http.post('activDeactive_city', {
      ...values
   });
   return await response.data;
};