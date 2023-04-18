import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Profile from "../Profile/Profile";
import {Routes, Route} from 'react-router-dom';
import Users from "../Users/Users";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialogs from "../Dialogs/Dialogs";
import Settings from "../Settings/Settings";
import {asyncInitFunc} from "../../Redux/Reducers/initApp_reducer";
import Header from "../Header/Header";
import {Col, Container, Row} from "react-bootstrap";
import styles from "./App.module.css"
import {addLogo} from "../../Redux/Reducers/profile_reducer";
import {useNavigate} from "react-router";
import Login from "../Authorization/Login/Login";
import Preloader from "../Common/Preloader/Preloader";
import {checkAuth, stateFetching} from "../../Redux/Reducers/auth_reducer";
import RegistrationPage from "../Authorization/Registration/RegistrationPage";
import NotFound from "../Common/NotFound/NotFound";
import Footer from "../Common/Footer/Footer";

const App = (props) => {
    useEffect(() => props.addLogo())
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.checkAuth();
        } else {
            props.stateFetching(false);
        }
    }, []);

    useEffect(() => {
        if (props.isAuth && props.isActivated) {
            navigate(`/profile/${props.currentUserID}`);
        }
    }, [props.isAuth]);

    if (props.isFetching) return <Preloader />;
    return (
        <div>
            <Container className={styles.App}>
                <Row>
                    {
                        props.isAuth ?
                            <Container>
                                <Header logo={props.logo} isAuth={props.isAuth} />
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/registration" element={<RegistrationPage />} />
                                    <Route path="/profile/:userID" element={<Profile isAuth={props.isAuth} />} />
                                    <Route path="/users" element={<Users  isAuth={props.isAuth} />} />
                                    <Route path="/dialogs" element={<Dialogs  isAuth={props.isAuth} />} />
                                    <Route path="/settings" element={<Settings  isAuth={props.isAuth} />} />
                                    <Route path="/" element={<Login />} />
                                </Routes>
                            </Container> :
                            <Container>
                                <Header logo={props.logo} isAuth={props.isAuth} initNav={props.isNavigation} />
                                <Routes>
                                    <Route path="/login" element={<Login logo={props.logo} />} />
                                    <Route path="/registration" element={<RegistrationPage logo={props.logo} />} />
                                    <Route path="/profile/:userID" element={<Profile isAuth={props.isAuth} />} />
                                    <Route path="/:link" element={<NotFound logo={props.logo} />} />
                                    <Route path="/" element={<Login logo={props.logo} />} />
                                </Routes>
                            </Container>
                    }
                </Row>
            </Container>
            {props.isAuth === true ? <Footer /> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    isInitialized: state.initApp.isInitialized,
    isNavigation: state.initApp.isNavigation,
    isAuth: state.authData.isAuth,
    isActivated: state.authData.isActivated,
    isFetching: state.authData.isFetching,
    currentUserID: state.authData.currentUserID,
    typeAuth: state.authData.typeAuth,
    isRegFinish: state.authData.isRegFinish,
    logo: state.initApp.logo
});

export default connect(mapStateToProps, {asyncInitFunc, checkAuth, addLogo, stateFetching})(App);
