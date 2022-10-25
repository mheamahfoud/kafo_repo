
import http from "../common/common-http";

export const GetSuccessStrories = async (lang) => {
   const response = await http.post('get_success_cases', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateSuccessStory= async (values) => {
   console.log(values)
   const response = await http.post('create_success_story', {
      ...values
   });
   return await response.data;
};

export const UpdateSuccessStory = async (id, values) => {

   const response = await http.post('update_success_story/' + id, { ...values });
   return await response.data;
};

export const ActivateDeactivateSuccessStory = async (values) => {
   const response = await http.post('activeDeactive_success_story', {
      ...values
   });
   return await response.data;
};
export const EditSuccessStroy = async (values) => {

   const response = await http.post('edit_success_story', { ...values });
   return await response.data;
};


export const ShowSuccessStory = async (values) => {

   const response = await http.post('show_success_story', { ...values });
   return await response.data;
};

