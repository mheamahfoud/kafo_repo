import http from "../common/common-http";

export const GetProviders = async (lang) => {
   const response = await http.post('get_provider', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateProvider = async (values) => {
   console.log(values)
   const response = await http.post('create_provider', {
      ...values
   });
   return await response.data;
};

export const UpdateProvider = async (id, values) => {

   const response = await http.post('update_provider/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateProviders = async (values) => {
   const response = await http.post('activDeactive_provider', {
      ...values
   });
   return await response.data;
};


export const GetProvidersSelectList = async (lang) => {
   const response = await http.post('get_provider_select_list', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};