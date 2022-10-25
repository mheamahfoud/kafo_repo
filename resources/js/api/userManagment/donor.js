import http from "../common/common-http";

export const GetDonors = async (lang) => {
   const response = await http.post('get_donor', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};


export const CreateDonor = async (values) => {
   const response = await http.post('create_donor', {
      ...values
   });
   return await response.data;
};

export const UpdateDonor = async (id, values) => {

   const response = await http.post('update_donor/' + id, { ...values });
   return await response.data;
};

export const GetDonor = async (values) => {
   const response = await http.post('edit_donor', {
      ...values
   });
   return await response.data;
};


export const ActivateDeactivateDonor = async (values) => {
   const response = await http.post('activDeactive_donor', {
      ...values
   });
   return await response.data;
};

export const GetDonorDetails = async (values) => {
   const response = await http.post('donor_detail', {
      ...values
   });
   return await response.data;
};


export const GetDonorList = async (lang) => {
   const response = await http.post('get_donor_list', {
   });
   if (response.data.success)
      return await response.data;
   else {
   
   }
};
