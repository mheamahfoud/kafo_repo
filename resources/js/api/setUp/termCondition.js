import http from "../common/common-http";

export const UpdateTermCondition = async (values) => {
    const response = await http.post('update_termCondition', { ...values });
    return await response.data;
};


export const GetTermCondition = async () => {
    const response = await http.post('get_termCondition', {
    });
    return await response.data;
};