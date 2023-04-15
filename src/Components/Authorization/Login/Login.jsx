import React, {useEffect, useState} from 'react';
import styles from './Login.module.css';
import {connect} from "react-redux";
import {addLoginAction, setTypeAuthorization} from "../../../Redux/Reducers/auth_reducer";
import {useNavigate} from "react-router";
import {getUserData} from "../../../Redux/Reducers/profile_reducer";
import Form from "../../Common/Form/Form";
import {addLogo, initNavigation} from "../../../Redux/Reducers/initApp_reducer";

const Login = props => {
    const navigate = useNavigate();
    useEffect(() => {
        props.addLogo();
        props.initNavigation(false)
    }, [])

    useEffect(() => {
        if (props.isLogged) {
            navigate(`/profile/${props.currentUserID}`);
        }
    }, [props.currentUserID, props.isLogged]);

    return (
        <div className={styles.Login_wrapper}>
            <div className={styles.Login}>
                <Form
                    logo={props.logo}
                    onSubmit={props.addLoginAction}
                    email={true}
                    password={true}
                    typeForm={'login'}
                    setTypeAuthorization={props.setTypeAuthorization}
                    messageFromServer={props.messageFromServer}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUserID: state.authData.currentUserID,
    isLogged: state.authData.isLogged,
    messageFromServer: state.authData.messageFromServer
});

export default connect(mapStateToProps, {addLogo, addLoginAction,
    getUserData, setTypeAuthorization, initNavigation})(Login);