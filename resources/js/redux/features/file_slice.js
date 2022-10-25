import { createSlice } from "@reduxjs/toolkit";
export const fileSlice = createSlice({
    name: "file",
    initialState: {
        deleteFiles: [],
    

        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {

        InitDelteFiles: (state, { payload }) => {
            state.deleteFiles = [];
        },
        AddDelteFiles: (state, { payload }) => {
            state.deleteFiles = [...state.deleteFiles, payload];
        },

    },
    extraReducers: {},
});
//export const userSelector = (state) => state;
//export const { setCourse } = employeeSlice.actions;
export const fileSelector = (state) => state.file;
export const { InitDelteFiles, AddDelteFiles } =
    fileSlice.actions;
export default fileSlice.reducer;
