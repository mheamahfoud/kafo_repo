import http from "../common/common-http";

export const GetValidationTypes = async (lang) => {
   const response = await http.post('get_valiation_type', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateValidationType = async (values) => {
   console.log(values)
   const response = await http.post('create_valiation_type', {
      ...values
   });
   return await response.data;
};

export const UpdateValidationType = async (id, values) => {

   const response = await http.post('update_validation_type/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateValidationType = async (values) => {
   const response = await http.post('activDeactive_valiation_type', {
      ...values
   });
   return await response.data;
};


export const GetValidationTypesSelectList = async (lang) => {
   const response = await http.post('get_valiation_type_select_list', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};