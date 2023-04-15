import {authAPI} from "../../API/api";

const SET_TYPE_AUTH = 'SET_TYPE_AUTH';
const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
const SET_FETCHING = 'SET_FETCHING';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_REG_FINISH = 'SET_REG_FINISH';

const init = {
    firstName: '',
    lastName: '',
    currentUserID: null,
    mail: null,
    isActivated: false,
    isAuth: false,
    isFetching: true,
    typeAuth: 'LOGIN',
    messageFromServer: null,
    isRegFinish: false
}

const auth_reducer = (state = init, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return {...state, ...action.payload};
        case SET_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_TYPE_AUTH:
            return {...state, typeAuth: action.typeAuth};
        case SET_MESSAGE:
            return {...state, messageFromServer: action.message};
        case SET_REG_FINISH:
            return {...state, isRegFinish: action.isRegFinish};
        default:
            return state;
    }
};
export default auth_reducer;

const setLoginData = (currentUserID, firstName, lastName, email, isActivated, isAuth) => ({type: SET_LOGIN_DATA, payload: {currentUserID, firstName, lastName, email, isActivated, isAuth} });
const setFetching = isFetching => ({type: SET_FETCHING, isFetching});
const setTypeAuth = typeAuth => ({type: SET_TYPE_AUTH, typeAuth});
const setMessage = message => ({type: SET_MESSAGE, message});
const setRegistrationFinish = isRegFinish => ({type: SET_REG_FINISH, isRegFinish});

export const addLoginAction = (firstName, lastName, mail, password) => (dispatch) => {
    authAPI.login(mail, password)
        .then(res => {
            if (res.resultCode === 0) {
                localStorage.setItem('token', res.accessToken);
                dispatch(setLoginData(res.user.id, res.user.firstName, res.user.lastName, res.user.mail, res.user.isActivated, true));
            } else {
                dispatch(setMessage(res.message));
                setTimeout(() => dispatch(setMessage(null)), 10000);
            }
        });
}

export const checkAuth = () => (dispatch) => {
    dispatch(setFetching(true));
    authAPI.refresh()
        .then(res => {
            if (res.resultCode === 0) {
                localStorage.setItem('token', res.accessToken);
                dispatch(setLoginData(res.user.id, res.user.firstName, res.user.lastName, res.user.email, res.user.isActivated, false));
            }
            setTimeout(() => dispatch(setFetching(false)), 750);
        })
};

export const addLogoutAction = () => (dispatch) => {
    authAPI.logout()
        .then(() => {
            dispatch(setLoginData(null, null, null, false, false));
        });
};

export const addRegistrationAction = (firstName, lastName, password, email) => (dispatch) => {
    authAPI.registration(firstName, lastName, email, password)
        .then(res => {
            if (res.resultCode === 1) {
                dispatch(setMessage(res.message));
                setTimeout(() => dispatch(setMessage(null)), 10000);
            } else {
                localStorage.setItem('token', res.accessToken);
                dispatch(setLoginData(res.user.id, res.user.firstName, res.user.lastName, res.user.email, res.user.isActivated, false));
                dispatch(setRegistrationFinish(true));
            }
        });
};

export const setTypeAuthorization = (type) => (dispatch) => {
    dispatch(setTypeAuth(type));
};

export const stateFetching = (value) => (dispatch) => {
    dispatch(setFetching(value));
}