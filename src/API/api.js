import * as axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_URL,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
    }
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const authAPI = {
    login (mail, password) {
        return instance.post('/auth/login', {mail, password}).then(response => response.data)
    },
    registration (firstName, lastName, password, email) {
        return instance.post('/auth/registration', {firstName, lastName, password, email}).then(response => response.data)
    },
    logout () {
        return instance.post('/auth/logout').then(response => response.data)
    },
    refresh () {
        return instance.get('/auth/refresh').then(response => response.data)
    }
};

export const profileAPI = {
    getLogo () {
        console.log(process.env.REACT_APP_URL)
        return instance.get(`/profile/logo`).then(response => response.data)
    },

    getUser (userID) {
        return instance.get(`/users/${userID}`).then(response => response.data)
    },

    createPost (userID, postText) {
        return instance.post(`/posts/${userID}`, {postText}).then(response => response.data)
    },

    deleteUserPost (currentUserID, postId, filter) {
        return instance.post(`/posts/delete-post/${postId}`, {userId: currentUserID, filter}).then(response => response.data)
    },

    updateStatus (userID, statusText) {
        return instance.put(`/profile/status/${userID}`, {statusText}).then(response => response.data)
    },

    getStatus (userID) {
        return instance.get(`/profile/status/${userID}`).then(response => response.data)
    },

    getPostsBySorting (userID, filter, currentPostPage, countPosts) {
        return instance.get(`/posts/posts-by-sorting/${userID}/${filter}/currentPage/${currentPostPage}&countPosts/${countPosts}`).then(response => response.data)
    },

    getAllPosts () {
        return instance.get(`/posts`).then(response => response.data)
    },

    getFollowerPosts (userID) {
        return instance.get(`/posts/follower-posts/${userID}`).then(response => response.data)
    },

    getOwnerPosts (userID) {
        return instance.get(`/posts/owner/${userID}`).then(response => response.data)
    },

    updateUserAvatar (userID, profilePicture) {
        let formData = new FormData();
        formData.append('profilePicture', profilePicture);
        formData.append('_id', userID);
        return instance.put(`/profile/avatar/${userID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    updateUserPhone (userID, phoneNumber) {
        return instance.post(`/profile/user-phone`, {_id: userID, phoneNumber}).then(response => response.data)
    },

    updateUserTechSkills (userID, skills) {
        return instance.post(`/profile/user-tech-skills`, {_id: userID, skills}).then(response => response.data)
    },

    updateUserSoftSkills (userID, skills) {
        return instance.post(`/profile/user-soft-skills`, {_id: userID, skills}).then(response => response.data)
    },

    updateUserJobDescription (userID, jobTitle) {
        return instance.post(`/profile/user-jobDescription`, {_id: userID, jobDescription: jobTitle}).then(response => response.data)
    },

    updateAboutMe (userID, aboutMe) {
        return instance.post(`/profile/aboutMe`, {_id: userID, aboutMe}).then(response => response.data)
    },

    updateProjectsList (userID, projects) {
        return instance.post(`/profile/projects`, {_id: userID, projects}).then(response => response.data)
    },

    updateExperienceList (userID, experience) {
        return instance.post(`/profile/experience`, {_id: userID, experience}).then(response => response.data)
    },

    updateEducation (userID, education) {
        return instance.post(`/profile/education`, {_id: userID, education}).then(response => response.data)
    }
};

export const usersAPI = {
    getUsers (sortParam, currentPage, countUsers, currentUserID) {
        return instance.get(`/users/${sortParam}/${currentUserID}/page=${currentPage}&count=${countUsers}`).then(response => response.data);
    },

    follow (userId, currentUserID) {
        return instance.put(`/users/${userId}/follow`, {_id: currentUserID}).then(response => response.data);
    },

    unfollow (userId, currentUserID) {
        return instance.put(`/users/${userId}/unfollow`, {_id: currentUserID}).then(response => response.data);
    }
};

export const messagesAPI = {
    getCompanions (currentUserID) {
        return instance.get(`/conversations/companions/${currentUserID}`).then(response => response.data);
    },

    createConversations (sender, receiver) {
        return instance.post(`/conversations/`, {
            "senderId": sender,
            "receiverId": receiver
        }).then(response => response.data);
    },

    getConversation (companionID, currentUserID) {
        return instance.get(`/conversations/${companionID}/${currentUserID}`).then(response => response.data);
    },

    getMessages (conversationID) {
        return instance.get(`/messages/${conversationID}`).then(response => response.data);
    },

    postMessages (conversationID, senderId, text) {
        return instance.post(`/messages`, {
            "conversationId": conversationID,
            "senderId": senderId,
            "text": text
        }).then(response => response.data);
    },
};
