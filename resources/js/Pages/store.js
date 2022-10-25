import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createStateSyncMiddleware, withReduxStateSync, initMessageListener, initStateWithPrevTab } from "redux-state-sync";

const initialGlobalState = {
  current_user: null,
  sidebarShow: true,
  sideHide: false,
  dialog_confirm_open: false,
  lang: 'en',
  dialog_confirm_data: { is_active: false, id: null },
  dialog_reason_case_open: false,
  dialog_reason_case_text: '',
  dialog_reason_case_id: null,
  dialog_confirm_cost_open: false,
  dialog_confirm_cost_data: { is_active: false, id: null },
  dialog_confirm_update_open: false,
  dialog_confirm_update_data: { is_active: false, id: null },

  
}
const initialDeleteFileState = {
  ids:[]
}
const changeGlobalState = (state = initialGlobalState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const DeleteFiles = (state = initialDeleteFileState, action) => {
  switch (action.type) {
    case 'init_delete_files':
      return { ...state,ids:[] }

    case 'add_delete_files':
      
      return { ...state,ids: [...state.ids,action.payload ] }
    default:
      return state
  }
}
const reducers = combineReducers({
  global: changeGlobalState,
  deltedFiles: DeleteFiles,
});


const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  whitelist: [],

};
//const middlewares = [createStateSyncMiddleware(config)];

const middlewares = [createStateSyncMiddleware(config)];
const store = createStore(
  reducers,

  {},
  // compose(
  applyMiddleware(...middlewares),

  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)


);

export default store
