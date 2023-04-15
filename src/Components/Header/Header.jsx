import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {addLogoutAction} from "../../Redux/Reducers/auth_reducer";

library.add(fas)

const Header = props => {
    const logOutAction = () => {
        props.addLogoutAction();
    };
    return (
        <>
            {
                props.isAuth ?
                    <>
                        <Navbar className={styles.Header_Navbar} sticky="top" expand={true}>
                            <Container className={styles.Header_container}>
                                <Navbar.Brand>
                                    <NavLink className={styles.Header_Navbar_Toggle_link} to={`/profile/${props.currentUserID}`}>
                                        <img src={props.logo} alt="logo"/>
                                    </NavLink>
                                </Navbar.Brand>
                                <Nav className={styles.Navs}>
                                    <NavLink className={styles.Header_Navbar_Toggle_link} to={`/dialogs`}>
                                        <FontAwesomeIcon icon="fa-solid fa-comment-dots"/>
                                    </NavLink>
                                    <NavLink className={styles.Header_Navbar_Toggle_link} to={`/users`}>
                                        <FontAwesomeIcon icon="fa-solid fa-users"/>
                                    </NavLink>
                                    <NavLink className={styles.Header_Navbar_Toggle_link} to={`/settings`}>
                                        <FontAwesomeIcon icon="fa-solid fa-gear"/>
                                    </NavLink>
                                    <NavLink className={styles.Header_Navbar_Toggle_link} to={`/login`} onClick={() => logOutAction()}>
                                        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket"/>
                                    </NavLink>
                                </Nav>
                            </Container>
                        </Navbar>
                    </> :
                    props.initNav === true ?
                        <>
                            <Navbar className={styles.Header_Navbar} sticky="top" expand={true}>
                                <Container className={styles.Header_container}>
                                    <Navbar.Brand>
                                        <NavLink className={styles.Header_Navbar_Toggle_link} to={`/profile/${props.currentUserID}`}>
                                            <img src={props.logo} alt="logo"/>
                                        </NavLink>
                                    </Navbar.Brand>
                                    <Nav className={styles.Navs}>
                                        <NavLink className={styles.Header_Navbar_Toggle_link} to={`/login`}>
                                            <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                                        </NavLink>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </> :
                        null
            }
        </>
    )
}

const mapStateToProps = state => ({
    userName: state.profilePage.info.userName,
    currentUserID: state.authData.currentUserID,
    isLogged: state.authData.isLogged,
    avatar: state.profilePage.info.photos.thumbnail
});

export default connect(mapStateToProps, {addLogoutAction})(Header);