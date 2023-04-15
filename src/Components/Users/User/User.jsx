import React, {useEffect, useState} from 'react';
import styles from './User.module.css';
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router";

const User = props => {
    const navigate = useNavigate();
    const [isFollow, setIsFollow] = useState(false);

    const displayLastSeen = (lastSeen) => {
        if (lastSeen === 0) {
            return `Last seen less 1 minute ago`
        } else if (lastSeen > 0 && lastSeen < 60) {
            return `Last seen ${lastSeen} minutes ago`
        } else if (lastSeen >= 60 && lastSeen < 1440) {
            return `Last seen ${(lastSeen / 60).toFixed(0)} h ${(lastSeen%60)} min ago`
        } else if (lastSeen > 1440 && lastSeen < 525600) {
            return `Last seen ${(lastSeen / 60 / 24).toFixed(2)} days ago`
        } else if (lastSeen > 525600) {
            return `Last seen ${(lastSeen / 60 / 24 / 365).toFixed(2)} years ago`
        }
        return lastSeen;
    };

    const changeStateFollow = (state) => {
        setIsFollow(state);
        if (!isFollow) {
            props.followUser(props.id, props.currentUserID)
        } else {
            props.unfollowUser(props.id, props.currentUserID)
        }
    }

    const goToProfile = (t) => {
        props.getUserData(props.id);
        navigate(`/profile/${props.id}`);
    }

    const checkIsFollow = (followings, id) => {
        if (followings.includes(id)) {
            setIsFollow(true);
        } else {
            setIsFollow(false);
        }
    }

    useEffect(() => {
        checkIsFollow(props.currentFollowings, props.id);
    }, [props.currentFollowings])

    return (
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <Row className={styles.User}>
                    <Col className={styles.User_Avatar} sm={3} xs={12} md={3}
                         onClick={(e) => goToProfile(e.currentTarget)}
                    >
                        <img className={styles.User_Avatar_Photo}
                             src={props.thumbnail}
                             alt="thumbnail"/>
                    </Col>
                    <Col className={styles.User_Info} sm={9} xs={12} md={9}>
                        <Row>
                            <Col className={styles.User_user_name}xs={12} md={8}>
                                <Row>
                                    <Col className={styles.User_Info_Username}>{`${props.firstName.toUpperCase()} ${props.lastName.toUpperCase()}`}</Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        {
                                            props.userStatus ?
                                                <span className={styles.User_Status}>
                                                    {props.userStatus.length > 38 ?
                                                        `${props.userStatus.slice(0, 38)}...` :
                                                        props.userStatus
                                                    }
                                                </span> :
                                                <span className={styles.User_Status}>{''}</span>
                                        }
                                        {
                                            props.usersOnline.includes(props.id) ?
                                                <span>Online</span> :
                                                <div>
                                                    <span>{displayLastSeen(props.lastSeen)}</span>
                                                </div>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col className={styles.User_btns_follow} xs={12} md={4}>
                                {
                                    !isFollow ?
                                        <button className={styles.User_btn_follow}
                                                onClick={() => changeStateFollow(true)}>Follow</button> :
                                        <button className={styles.User_btn_follow}
                                                onClick={() => changeStateFollow(false)}>Unfollow</button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={3}></Col>
        </Row>
    )
};

export default User;