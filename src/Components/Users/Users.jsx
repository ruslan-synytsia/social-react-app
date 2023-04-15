import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import styles from './Users.module.css';
import ListUsers from "./ListUsers/ListUsers";
import {Col, Container, Row} from "react-bootstrap";
import Pagination from "../Common/Pagination/Pagination";
import {addCurrentPage, addListUsers, followUser, unfollowUser} from "../../Redux/Reducers/users_reducer";
import {getUserData} from "../../Redux/Reducers/profile_reducer";

const Users = props => {
    const GET_ALL = 'all';
    const GET_FOLLOWINGS = 'followings';
    const GET_FOLLOWERS = 'followers';

    const [isAll, setIsAll] = useState(true);
    const [isFollowings, setIsFollowings] = useState(false);
    const [isFollowers, setIsFollowers] = useState(false);

    const sortingUsers = (target) => {
        if (target.textContent === 'All') {
            setIsAll(true);
            setIsFollowings(false);
            setIsFollowers(false);
        } else if (target.textContent === 'Followings') {
            setIsFollowings(true);
            setIsFollowers(false);
            setIsAll(false);
        } else if (target.textContent === 'Followers') {
            setIsFollowers(true);
            setIsAll(false);
            setIsFollowings(false);
        }
    }

    useEffect(() => {
        if (isAll) {
            props.addListUsers(GET_ALL, props.currentPage, props.countUsers, props.currentUserID);
        } else if (isFollowings) {
            props.addListUsers(GET_FOLLOWINGS, props.currentPage, props.countUsers, props.currentUserID);
        } else if (isFollowers) {
            props.addListUsers(GET_FOLLOWERS, props.currentPage, props.countUsers, props.currentUserID);
        }
    }, [props.currentPage, isAll, isFollowings, isFollowers])

    return (
        <Container>
            <Col className={styles.Users} md={12}>
                {
                    <div className={styles.Users_Button_Group}>
                        <button className={isAll ?
                            styles.Users_Button_Group_button_active :
                            styles.Users_Button_Group_button}
                                onClick={(e) => sortingUsers(e.currentTarget)}
                        >
                            All
                        </button>
                        <button className={isFollowings ?
                            styles.Users_Button_Group_button_active :
                            styles.Users_Button_Group_button}
                                onClick={(e) => sortingUsers(e.currentTarget)}
                        >
                            Followings
                        </button>
                        <button className={isFollowers ?
                            styles.Users_Button_Group_button_active :
                            styles.Users_Button_Group_button}
                                onClick={(e) => sortingUsers(e.currentTarget)}
                        >
                            Followers
                        </button>
                    </div>
                }
                <Row className={styles.Users_list}>
                    <ListUsers
                        getUserData={props.getUserData}
                        users={props.users}
                        usersOnline={props.usersOnline}
                        currentUserID={props.currentUserID}
                        currentFollowings={props.currentFollowings}
                        followUser={props.followUser}
                        unfollowUser={props.unfollowUser}
                    />
                </Row>
                <Row className={styles.Users_pagination}>
                    <Pagination
                        totalCountUsers={props.totalCountUsers}
                        addListUsers={props.addListUsers}
                        countUsers={props.countUsers}
                        addCurrentPage={props.addCurrentPage}
                        currentPage={props.currentPage}
                    />
                </Row>
            </Col>
        </Container>
    )
};

const mapStateToProps = state => ({
    users: state.users.usersList,
    usersOnline: state.users.usersOnline,
    totalCountUsers: state.users.totalCountUsers,
    currentPage: state.users.currentPage,
    countUsers: state.users.countUsers,
    currentUserID: state.authData.currentUserID,
    currentFollowings: state.users.currentFollowings
});

export default connect(mapStateToProps, {
    getUserData, addListUsers,
    addCurrentPage, followUser, unfollowUser
})(Users);