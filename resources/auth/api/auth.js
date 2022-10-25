import http from "../common-http/common-http";

export const LoginAuth= async (userName, password, remember) => {
    try {
        const response = await http.post('login_user', {
            userName,
            password,
            remember,
        });
        return await response.data;
    } catch (error) {
        if (error.response) {
            return { message: error.response.statusText, success: false };
        }
        return { message: 'Invalid username or password!', success: false };
    }
};