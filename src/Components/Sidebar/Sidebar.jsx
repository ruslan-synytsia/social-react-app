import React from 'react';
import {connect} from "react-redux";
import styles from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

const Sidebar = props => {
    return (
        <div className={styles.Sidebar}>
            <nav>
                <div>
                    <NavLink
                        to={`/profile/${props.currentUserID}`}
                    >
                        Profile
                    </NavLink>
                </div>
                <div><NavLink to="/dialogs">Messages</NavLink></div>
                <div><NavLink to="/news">News</NavLink></div>
                <div><NavLink to="/users">Find friends</NavLink></div>
                <div className={styles.Sidebar_settings}>
                    <NavLink to="/settings">Settings</NavLink>
                </div>
            </nav>
        </div>
    )
};

const mapStateToProps = state => ({
    currentUserID: state.authData.currentUserID
})

export default connect(mapStateToProps, null)(Sidebar);