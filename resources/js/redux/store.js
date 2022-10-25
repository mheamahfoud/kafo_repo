import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './features/global_slice';
import fileSlice from './features/file_slice';
import { notificationSlice } from './features/notification_slice';
import { combineReducers } from 'redux';
import { apiSlice } from './api/apiSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    //[apiSlice.reducerPath]: apiSlice.reducer,
    global: globalSlice,
   // notification: notificationSlice,
    file: fileSlice,


  },
  // devTools: process.env.NODE_ENV === 'development',
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([
  //     apiSlice.middleware,
  //     // userApi.middleware,
  //     // // Add the PostApi middleware to the store
  //     // postApi.middleware,
  //   ]),
});

export default store;


// export const store = configureStore({
//   reducer: {
//     reducers,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// })
// setupListeners(store.dispatch)











// export const store = configureStore({
//   reducer: {
//     reducers,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// })
// setupListeners(store.dispatch)






