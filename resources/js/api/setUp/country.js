import http from "../common/common-http";

export const GetCountries = async (lang) => {
   const response = await http.post('get_country', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateCountry = async (values) => {
   console.log(values)
   const response = await http.post('create_country', {
      ...values
   });
   return await response.data;
};

export const UpdateCountry = async (id, values) => {

   const response = await http.post('update_country/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateCountry = async (values) => {
   const response = await http.post('activDeactive_country', {
      ...values
   });
   return await response.data;
};