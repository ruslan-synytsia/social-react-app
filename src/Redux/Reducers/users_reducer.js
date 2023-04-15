import {usersAPI} from "../../API/api";

const SET_LIST_USERS = 'SET_LIST_USERS';
const SET_USERS_ONLINE = 'SET_USERS_ONLINE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const init = {
    usersList: [{id: null, userName: '', isLogged: false, thumbnail: '', userStatus: ''}],
    usersOnline: [],
    totalCountUsers: null,
    currentPage: 1,
    countUsers: 5,
    currentFollowings: []
}

const profile_reducer = (state = init, action) => {
    switch (action.type) {
        case SET_LIST_USERS:
            return {...state,
                ...state.usersList,
                usersList: [...action.users],
                totalCountUsers: action.totalCount,
                currentFollowings: action.currentFollowings
            };
        case SET_USERS_ONLINE:
            return {...state, usersOnline: action.usersOnline}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.numberPage};
        default:
            return {...state};
    }
};

export default profile_reducer;

const setListUsers = (users, totalCount, currentFollowings) => ({type: SET_LIST_USERS, users, totalCount, currentFollowings});
const setUsersOnline = (usersOnline) => ({type: SET_USERS_ONLINE, usersOnline});
const setCurrentPage = (numberPage) => ({type: SET_CURRENT_PAGE, numberPage});

export const addListUsers = (sortParam, numberPage, countUsers, currentUserID) => (dispatch) => {
    usersAPI.getUsers(sortParam, numberPage, countUsers, currentUserID)
        .then(res => {
            if (res.users !== null) {
                dispatch(setListUsers(res.users, res.totalCount, res.currentFollowings));
            } else {
                dispatch(setListUsers([{id: null, userName: '', isLogged: false, thumbnail: '', userStatus: ''}], 0, []));
            }
        });
}

export const addUsersOnline = (usersOnline) => (dispatch) => {
    dispatch(setUsersOnline(usersOnline));
}

export const addCurrentPage = (numberPage) => (dispatch) => {
    dispatch(setCurrentPage(numberPage));
}

export const followUser = (userId, currentUserID) => () => {
    usersAPI.follow(userId, currentUserID)
};

export const unfollowUser = (userId, currentUserID) => () => {
    usersAPI.unfollow(userId, currentUserID)
};