import { createSlice } from "@reduxjs/toolkit";
export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notification_data: {},
        dialog_confirm_notification_open: false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {

        setDialogConfirmNotificationOpen: (state, { payload }) => {
            state.dialog_confirm_notification_open = payload;
        },
        setNotificationData: (state, { payload }) => {
            state.notification_data = payload;
        },

    },
    extraReducers: {},
});
//export const userSelector = (state) => state;
//export const { setCourse } = employeeSlice.actions;
export const notificationSelector = (state) => state.notification;
export const {setDialogConfirmNotificationOpen,setNotificationData } =
    notificationSlice.actions;
export default notificationSlice.reducer;
