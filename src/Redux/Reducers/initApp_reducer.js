import {profileAPI} from "../../API/api";

const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_INIT_DATA = 'SET_INIT_DATA';
const SET_LOGO = 'SET_LOGO';
const SET_NAVIGATION = 'SET_NAVIGATION';

const init = {
    logo: '',
    isNavigation: false,
    isAuth: false,
    authData: {id: null, userName: null, isActivated: false, email: null},
    isInitialized: false
}

const initApp_reducer = (state = init, action) => {
    switch (action.type) {
        case SET_INIT_DATA:
            return {...state, isInitialized: action.isInit};
        case SET_NAVIGATION:
            return {...state, isNavigation: action.isNavigation};
        case SET_AUTH_STATUS:
            return {...state, isAuth: action.isAuth};
        case SET_AUTH_DATA:
            return {...state, ...state.authData, authData: {...action.payload}};
        case SET_LOGO:
            return {...state, logo: action.logo};
        default:
            return state;
    }
};
export default initApp_reducer;

const setInit = isInit => ({type: SET_INIT_DATA, isInit});
const setLogo = (logo) => ({type: SET_LOGO, logo});
const setNavigation = (isNavigation) => ({type: SET_NAVIGATION, isNavigation});

export const asyncInitFunc = (value) => dispatch => {
    setTimeout(() => {
        dispatch(setInit(value));
    }, 1000)
};

export const initNavigation = (value) => dispatch => {
    dispatch(setNavigation(value));
};

export const addLogo = () => (dispatch) => {
    profileAPI.getLogo()
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setLogo(res.logo));
            }
        })
};