import React, {useEffect} from 'react';
import {connect} from "react-redux";
import styles from './Profile.module.css';
import Info from "./Info/Info";
import {
    addSocketIO,
    addUserStatus,
    downloadFile,
    getUserData,
    getUserStatus
} from "../../Redux/Reducers/profile_reducer";
import {addUsersOnline} from "../../Redux/Reducers/users_reducer";
import Posts from "./Posts/Posts";
import {Container} from "react-bootstrap";
import {useParams} from "react-router";
import {createConversation} from "../../Redux/Reducers/messages_reducer";
import {stateFetching} from "../../Redux/Reducers/auth_reducer";
import {initNavigation} from "../../Redux/Reducers/initApp_reducer";
import socketIOClient from "socket.io-client";

const Profile = props => {
    let params = useParams();

    useEffect(() => props.addSocketIO(socketIOClient(props.connection)), [])

    useEffect(() => {
        if (props.socketIO !== null) {
            props.socketIO.emit('CURRENT_USER_ID', props.currentUserID);
            props.socketIO.on('GET_USERS_ONLINE', onlineId => props.addUsersOnline(onlineId));
        }
    }, [props.socketIO, props.currentUserID])

    useEffect(() => {
        props.getUserData(params.userID);
        props.getUserStatus(params.userID);
        props.initNavigation(true)
    }, [props.userID, params.userID]);

    return (
        <div>
            <Container>
                <div className={styles.Profile_wrapper}>
                    {console.log(props.info)}
                    <Info
                        isAuth={props.isAuth}
                        info={props.info}
                        usersOnline={props.usersOnline}
                        users={props.users}
                        phoneNumber={props.phoneNumber}
                        email={props.email}
                        techSkills={props.techSkills}
                        softSkills={props.softSkills}
                        jobDescription={props.jobDescription}
                        status={props.userStatus}
                        currentUserID={props.currentUserID}
                        addUserStatus={props.addUserStatus}
                        downloadFile={props.downloadFile}
                        userAvatar={props.userAvatar}
                        createConversation={props.createConversation}
                        isFetching={props.isFetching}
                        stateFetching={props.stateFetching}
                    />
                    {
                        props.currentUserID === params.userID ? <Posts userID={params.userID} /> : null
                    }
                </div>
            </Container>
        </div>
    )
};
const mapStateToProps = state => ({
    connection: state.profilePage.connection,
    users: state.users.usersList,
    usersOnline: state.users.usersOnline,
    socketIO: state.profilePage.socketIO,
    info: state.profilePage.info,
    userStatus: state.profilePage.userStatus,
    userAvatar: state.profilePage.info.photos.profilePicture,
    phoneNumber: state.profilePage.info.contacts.phoneNumber,
    jobDescription: state.profilePage.info.jobDescription,
    techSkills: state.profilePage.info.techSkills,
    softSkills: state.profilePage.info.softSkills,
    email: state.profilePage.info.contacts.email,
    currentUserID: state.authData.currentUserID,
    isFetching: state.authData.isFetching,
    isAuth: state.authData.isAuth
});

export default connect(mapStateToProps, {
    addSocketIO,
    addUsersOnline,
    getUserData, addUserStatus,
    getUserStatus, downloadFile,
    createConversation, stateFetching,
    initNavigation
})(Profile);
