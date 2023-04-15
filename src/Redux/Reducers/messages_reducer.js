import {messagesAPI} from "../../API/api";

const SET_LIST_COMPANIONS = 'SET_LIST_COMPANIONS';
const SET_CONVERSATION = 'SET_CONVERSATION';
const SET_MESSAGES = 'SET_MESSAGES';

const init = {
    listCompanions: [],
    conversationId: '',
    messages: []
}

const messages_reducer = (state = init, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {...state, messages: action.messages};
        case SET_CONVERSATION:
            return {...state, conversationId: action.conversationId}
        case SET_LIST_COMPANIONS:
            return {...state, listCompanions: action.listCompanions};
        default:
            return {...state};
    }
};

export default messages_reducer;

const setCompanions = (listCompanions) => ({type: SET_LIST_COMPANIONS, listCompanions});
const setConversationId = (conversationId) => ({type: SET_CONVERSATION, conversationId});
const setMessages = (messages) => ({type: SET_MESSAGES, messages});

export const addCompanions = (currentUserID) => (dispatch) => {
    messagesAPI.getCompanions(currentUserID)
        .then(res => {
            dispatch(setCompanions(res));
        });
}

export const createConversation = (sender, receiver, currentUserID) => (dispatch) => {
    messagesAPI.createConversations(sender, receiver)
        .then(() => {
            messagesAPI.getCompanions(currentUserID)
                .then(res => {
                    dispatch(setCompanions(res));
                });
        });
}

export const getConversation = (companionID, currentUserID) => (dispatch) => {
    messagesAPI.getConversation(companionID, currentUserID)
        .then(res => {
            dispatch(setConversationId(res));
            messagesAPI.getMessages(res)
                .then(res => {
                    dispatch(setMessages(res));
                });
        });
}

export const sendMessages = (conversationID, senderId, text) => (dispatch) => {
    messagesAPI.postMessages(conversationID, senderId, text)
        .then(res => {
            messagesAPI.getMessages(res.conversationId)
                .then(res => {
                    dispatch(setMessages(res));
                });
        });
}
