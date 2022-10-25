import http from "../../common/common-http";

export const GetCosts = async (values) => {
   const response = await http.post('get_costs', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateCost = async (values) => {
   console.log(values)
   const response = await http.post('create_cost', {
      ...values
   });
   return await response.data;
};

export const UpdateCost = async (id, values) => {

   const response = await http.post('update_cost/' + id, { ...values });
   return await response.data;
};


export const EditCost = async (values) => {

   const response = await http.post('edit_cost', { ...values });
   return await response.data;
};



export const ActivateDeactivateCost = async (values) => {
   const response = await http.post('activDeactive_cost', {
      ...values
   });
   return await response.data;
};
