import React, {useState} from 'react';
import styles from './ListUsers.module.css';
import User from "../User/User";
import {Col} from "react-bootstrap";

const ListUsers = props => {
    return (
        <Col xs={12} md={12} className={styles.ListUsers}>
            {
                props.users[0].id !== null ?
                props.users.map(user => {
                    return <User
                        id={user.id}
                        usersOnline={props.usersOnline}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        thumbnail={user.thumbnail}
                        userStatus={user.userStatus}
                        lastSeen={user.lastSeen}
                        currentUserID={props.currentUserID}
                        currentFollowings={props.currentFollowings}
                        followUser={props.followUser}
                        unfollowUser={props.unfollowUser}
                        key={user.id}
                        getUserData={props.getUserData}
                    />
                    }
                ) : <div>
                        <p>No users in this category</p>
                    </div>
            }
        </Col>
    )
};

export default ListUsers;