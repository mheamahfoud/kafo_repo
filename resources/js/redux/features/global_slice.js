import { createSlice } from "@reduxjs/toolkit";
export const globalSlice = createSlice({
    name: "global",
    initialState: {
        current_user: null,
        sidebarShow: true,
        sideHide: false,
        dialog_confirm_open: false,
        lang: localStorage.getItem('current_language') || 'en',
        dialog_confirm_data: { is_active: false, id: null },
        dialog_reason_case_open: false,
        dialog_reason_case_text: '',
        dialog_reason_case_id: null,
        dialog_confirm_cost_open: false,
        dialog_confirm_cost_data: { is_active: false, id: null },
        dialog_confirm_update_open: false,
        dialog_confirm_update_data: { is_active: false, id: null },
        notification_data: {},
        notification_icon: undefined,
        dialog_confirm_notification_open: false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {
        setLang: (state, { payload }) => {
            state.lang = payload;
        },
        setSideHide: (state, { payload }) => {
            state.sideHide = payload;
        },

        setSidebarShow: (state, { payload }) => {
            state.sidebarShow = payload;
        },
        setCurrentUser: (state, { payload }) => {
            state.current_user = payload;
        },

        setDialogConfirmOpen: (state, { payload }) => {
            state.dialog_confirm_open = payload;
        },


        setDialogConfirmData: (state, { payload }) => {
            state.dialog_confirm_data = payload;
        },

        setDialogReasonCaseOpen: (state, { payload }) => {
            state.dialog_reason_case_open = payload;
        },

        setDialogReasonCaseText: (state, { payload }) => {
            state.dialog_reason_case_text = payload;
        },

        setDialogReasonCaseId: (state, { payload }) => {
            state.dialog_reason_case_id = payload;
        },

        setDialogConfirmCostOpen: (state, { payload }) => {
            state.dialog_confirm_cost_open = payload;
        },

        setDialogConfirmCostData: (state, { payload }) => {
            state.dialog_confirm_cost_data = payload;
        },


        setDialogConfirmUpdateOpen: (state, { payload }) => {
            state.dialog_confirm_update_open = payload;
        },

        setDialogConfirmUpdateData: (state, { payload }) => {
            state.dialog_confirm_update_data = payload;
        },
        setDialogConfirmNotificationOpen: (state, { payload }) => {
        
            state.dialog_confirm_notification_open = payload;
        },
        setNotificationData: (state, { payload }) => {
            state.notification_data = payload;
        },
        setNotificationIcon: (state, { payload }) => {
            state.notification_icon = payload;
        },
    },
    extraReducers: {},
});
//export const userSelector = (state) => state;
//export const { setCourse } = employeeSlice.actions;
export const globalSelector = (state) => state.global;
export const { setLang, setSideHide, setSidebarShow, setCurrentUser, setDialogConfirmOpen, setDialogConfirmData,
    setDialogReasonCaseOpen, setDialogReasonCaseText, setDialogReasonCaseId, setDialogConfirmCostOpen, setDialogConfirmCostData, setDialogConfirmUpdateOpen, setDialogConfirmUpdateData ,
    setDialogConfirmNotificationOpen,setNotificationData,setNotificationIcon} =
    globalSlice.actions;
export default globalSlice.reducer;
