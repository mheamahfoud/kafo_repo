import http from "../common/common-http";

export const GetQuestions = async (lang) => {
   const response = await http.post('get_questions', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateQuestion = async (values) => {
   console.log(values)
   const response = await http.post('create_question', {
      ...values
   });
   return await response.data;
};

export const UpdateQuestion = async (id, values) => {

   const response = await http.post('update_question/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateQuestion = async (values) => {
   const response = await http.post('activDeactive_question', {
      ...values
   });
   return await response.data;
};

