import http from "../common/common-http";

export const GetCases = async (lang) => {
   const response = await http.post('get_case', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateCase = async (values) => {
   console.log(values)
   const response = await http.post('create_case', {
      ...values
   });
   return await response.data;
};

export const UpdateCase = async (id, values) => {

   const response = await http.post('update_case/' + id, { ...values });
   return await response.data;
};

export const ActivateDeactivateCase = async (values) => {
   const response = await http.post('activDeactive_case', {
      ...values
   });
   return await response.data;
};
export const EditCase = async (values) => {

   const response = await http.post('edit_case', { ...values });
   return await response.data;
};


export const ShowCase = async (values) => {

   const response = await http.post('show_case', { ...values });
   return await response.data;
};

export const PublishCase = async (values) => {
   const response = await http.post('publish_case', {
      ...values
   });
   return await response.data;
};


export const CancelCase = async (values) => {
   const response = await http.post('cancel_case', {
      ...values
   });
   return await response.data;
};



export const CloseCase = async (values) => {
   const response = await http.post('close_case', {
      ...values
   });
   return await response.data;
};


export const GetDonorsCase = async (values) => {
   const response = await http.post('get_donors_case', {
      ...values
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const UpdateSecretInfo = async (id, values) => {

   const response = await http.post('update_secret_info/' + id, { ...values });
   return await response.data;
};


export const GetFollowersCase = async (values) => {
   const response = await http.post('get_followers_case', {
      ...values
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};


export const GetUpdatesCase = async (values) => {
   const response = await http.post('get_updates_case', {
      ...values
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};




export const CreateUpdate = async (values) => {
   console.log(values)
   const response = await http.post('create_update_case', {
      ...values
   });
   return await response.data;
};

export const UpdateCaseUpdate = async (id, values) => {
   const response = await http.post('update_case_update/' + id, { ...values });
   return await response.data;
};

export const ActivateDeactivateCaseUpdate = async (values) => {
   const response = await http.post('activDeactive_case_case_update', {
      ...values
   });
   return await response.data;
};

export const GetReportCase = async (values) => {

   const response = await http.post('report_case', { ...values });
   return await response.data;
};