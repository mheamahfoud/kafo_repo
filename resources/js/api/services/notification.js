import http from "../common/common-http";


export const setFcmToken = async (token) => {
    const response = await http.post('setFcmToken', {
        token,
    });
    return await response.data;
};


export const sendNotification = async (values) => {
    const response = await http.post('send_notification', {
        ...values,
    });
    return await response.data;
};


export const sendSpecificNotification = async (values) => {
    const response = await http.post('send_specific_notification', {
        ...values,
    });
    return await response.data;
};

export const sendPushNotification = async (values) => {
    const response = await http.post('send_push_notification', {
        ...values,
    });
    return await response.data;
};