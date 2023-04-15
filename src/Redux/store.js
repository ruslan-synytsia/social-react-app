import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleWare from 'redux-thunk';
import profile_reducer from "./Reducers/profile_reducer";
import auth_reducer from "./Reducers/auth_reducer";
import initApp_reducer from "./Reducers/initApp_reducer";
import users_reducer from "./Reducers/users_reducer";
import messages_reducer from "./Reducers/messages_reducer";

let reducers = combineReducers({
    initApp: initApp_reducer,
    users: users_reducer,
    profilePage: profile_reducer,
    authData: auth_reducer,
    messages: messages_reducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;