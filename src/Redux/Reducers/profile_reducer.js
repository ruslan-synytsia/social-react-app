import {profileAPI} from "../../API/api";

const SET_SOCKET_IO = 'SET_SOCKET_IO';
const SET_LOGO = 'SET_LOGO';
const SET_USER_DATA = 'SET_USER_DATA';
const ADD_POSTS = 'ADD_POSTS';
const ADD_OWNER_POSTS = 'ADD_OWNER_POSTS';
const ADD_FOLLOWER_POSTS = 'ADD_FOLLOWER_POSTS';
const ADD_ALL_POSTS = 'ADD_ALL_POSTS';
const ADD_USER_STATUS = 'ADD_USER_STATUS';
const ADD_USER_AVATAR = 'ADD_USER_AVATAR';
const CHANGE_CURRENT_POST_PAGE = 'CHANGE_CURRENT_POST_PAGE';
const CHANGE_COUNT_PAGES = 'CHANGE_COUNT_PAGES';


const init = {
    connection: process.env.REACT_APP_WEBSOCKET_URL,
    socketIO: null,
    logo: '',
    info: {
        id: null,
        firstName: null,
        lastName: null,
        aboutMe: null,
        jobDescription: null,
        techSkills: [],
        softSkills: [],
        education: {},
        projects: [],
        experience: [],
        contacts: {phoneNumber: '', email: ''},
        photos: {profilePicture: '', thumbnail: ''}
    },
    posts: [],
    currentPostPage: 1,
    countPosts: 5,
    countPages: 0,
    currentFollowingsPosts: [],
    userStatus: ''
}

const profile_reducer = (state = init, action) => {
    switch (action.type) {
        case SET_SOCKET_IO:
            return {...state, socketIO: action.socketIO};
        case SET_LOGO:
            return {...state, logo: action.logo};
        case SET_USER_DATA:
            console.log(action.payload)
            return {...state, info: {...action.payload.info, contacts: action.payload.contacts, photos: action.payload.photos}};
        case ADD_POSTS:
            return {...state, posts: action.posts};
        case ADD_OWNER_POSTS:
            return {...state, posts: action.ownerPosts};
        case ADD_FOLLOWER_POSTS:
            return {...state, posts: action.followerPosts};
        case ADD_ALL_POSTS:
            return {...state, posts: action.allPosts};
        case ADD_USER_STATUS:
            return {...state, userStatus: action.statusText};
        case ADD_USER_AVATAR:
            return { ...state, info: {...state.info, photos: action.photos}};
        case CHANGE_CURRENT_POST_PAGE:
            return {...state, currentPostPage: action.currentPostPage}
        case CHANGE_COUNT_PAGES:
            return {...state, countPages: action.countPages}
        default:
            return {...state};
    }
};

export default profile_reducer;

const setSocketIO = (socketIO) => ({type: SET_SOCKET_IO, socketIO});
const setLogo = (logo) => ({type: SET_LOGO, logo});
const setUserData = (payload) => ({type: SET_USER_DATA, payload});
const setPosts = (posts) => ({type: ADD_POSTS, posts});
const setOwnerPosts = (ownerPosts) => ({type: ADD_OWNER_POSTS, ownerPosts});
const setFollowerPosts = (followerPosts) => ({type: ADD_FOLLOWER_POSTS, followerPosts});
const setAllPosts = (allPosts) => ({type: ADD_ALL_POSTS, allPosts});
const setUserStatus = (statusText) => ({type: ADD_USER_STATUS, statusText});
const setProfileAvatar = (photos) => ({type: ADD_USER_AVATAR, photos});
const setCurrentPostPage = (currentPostPage) => ({type: CHANGE_CURRENT_POST_PAGE, currentPostPage});
const setCountPages = (countPages) => ({type: CHANGE_COUNT_PAGES, countPages});

export const addSocketIO = (socketIO) => dispatch => {
    dispatch(setSocketIO(socketIO));
};

export const getUserData = (userId) => (dispatch) => {
    profileAPI.getUser(userId)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setUserData(res.user));
                dispatch(setCurrentPostPage(1));
            }
        });
}

export const addPost = (userId, post) => () => {
    profileAPI.createPost(userId, post);
};

export const deletePost = (currentUserID, postId, filter) => () => {
    profileAPI.deleteUserPost(currentUserID, postId, filter)
};

export const addUserPhoneNumber = (userID, phoneNumber) => () => {
    profileAPI.updateUserPhone(userID, phoneNumber)
};

export const addUserSkills = (label, userID, skills) => () => {
    label === 'tech' ? profileAPI.updateUserTechSkills(userID, skills) : profileAPI.updateUserSoftSkills(userID, skills)
};

export const addUserJobTitle = (userID, jobTitle) => () => {
    profileAPI.updateUserJobDescription(userID, jobTitle)
};

export const addAboutMe = (userID, aboutMe) => () => {
    profileAPI.updateAboutMe(userID, aboutMe)
};

export const addProjects = (userID, projects) => () => {
    profileAPI.updateProjectsList(userID, projects)
};

export const addExperience = (userID, experience) => () => {
    profileAPI.updateExperienceList(userID, experience)
};

export const addEducation = (userID, education) => () => {
    profileAPI.updateEducation(userID, education)
};

export const addPostsBySorting = (userID, filter, currentPostPage, countPosts) => (dispatch) => {
    profileAPI.getPostsBySorting(userID, filter, currentPostPage, countPosts)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setPosts(res.posts));
                dispatch(setCountPages(res.countPages));
            }
        })
};

export const addOwnerPosts = (userId) => (dispatch) => {
    profileAPI.getOwnerPosts(userId)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setOwnerPosts(res.posts));
            }
        })
};

export const addFollowerPosts = (userId) => (dispatch) => {
    profileAPI.getFollowerPosts(userId)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setFollowerPosts(res.posts));
            }
        })
};

export const addAllPosts = (userId) => (dispatch) => {
    profileAPI.getAllPosts(userId)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setAllPosts(res.posts))
            }
        })
};

export const addUserStatus = (userId, statusText) => (dispatch) => {
    profileAPI.updateStatus(userId, statusText)
        .then(res => {
            if (res.statusCode === 0) {
                profileAPI.getStatus(userId)
                    .then(res => {
                        dispatch(setUserStatus(res));
                    })
            }
        })
};

export const getUserStatus = (currentUserId) => (dispatch) => {
    profileAPI.getStatus(currentUserId)
        .then(res => {
            dispatch(setUserStatus(res));
        })
};

export const downloadFile = (userId, file) => (dispatch) => {
    profileAPI.updateUserAvatar(userId, file)
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setProfileAvatar(res.photos));
            }
        })
};

export const addLogo = () => (dispatch) => {
    profileAPI.getLogo()
        .then(res => {
            if (res.statusCode === 0) {
                dispatch(setLogo(res.logo));
            }
        })
};

export const changeCurrentPostPage = (currentPostPage) => dispatch => {
    dispatch(setCurrentPostPage(currentPostPage));
};

