import http from "../common/common-http";

export const GetRelations = async (lang) => {
   const response = await http.post('get_relation', {
   });
   if (response.data.success)
      return await response.data;
   else {
      alert('there is error')
   }
};

export const CreateRelation = async (values) => {
   console.log(values)
   const response = await http.post('create_relation', {
      ...values
   });
   return await response.data;
};

export const UpdateRelation = async (id, values) => {

   const response = await http.post('update_relation/' + id, { ...values });
   return await response.data;
};


export const ActivateDeactivateRelation = async (values) => {
   const response = await http.post('activDeactive_relation', {
      ...values
   });
   return await response.data;
};

export const GetRelationsSelectList = async (lang) => {
    const response = await http.post('get_relation_select_list', {
    });
    if (response.data.success)
       return await response.data;
    else {
       alert('there is error')
    }
 };