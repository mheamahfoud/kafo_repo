import http from "../../common/common-http";

export const GetValidationsByCase = async (values) => {
   const response = await http.post('get_validations_by_case', {
      ...values
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateValidation = async (values) => {
   console.log(values)
   const response = await http.post('create_validation', {
      ...values
   });
   return await response.data;
};

export const UpdateValidation = async (id, values) => {

   const response = await http.post('update_validation/' + id, { ...values });
   return await response.data;
};


export const EditValidation = async (values) => {

   const response = await http.post('edit_validation', { ...values });
   return await response.data;
};



export const DeleteValidation = async (values) => {
   const response = await http.post('delete_validation', {
      ...values
   });
   return await response.data;
};
