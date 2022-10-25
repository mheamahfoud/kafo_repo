import http from "../common/common-http";
import axios from "axios";


export const uploadTempFile = async (formData) => {

    const response = await http.post('uplode_image',
        formData
    );
    return await response.data;
};

export const DeleteFileCase = async (values) => {
    const response = await http.post('delete_file_case', {
        ...values
    });
    if (response.data.success)
        return await response.data;
    else {
        alert('there is error')
    }
};


export const DeleteFile = async (values) => {
    const response = await http.post('delete', {
        ...values
    });
    if (response.data.success)
        return await response.data;
    else {
        alert('there is error')
    }
};



// export const deleteTempFile = async (disk, file_path) => {
//     const response = await axios.post('/delete_temp_file', { disk, file_path });
//     return await response.data;
// };
