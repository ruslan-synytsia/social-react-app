import React, {useEffect, useState} from 'react';
import styles from './Posts.module.css';
import Post from "./Post/Post";
import {
    addAllPosts,
    addFollowerPosts,
    addOwnerPosts, addPost,
    addPostsBySorting, changeCurrentPostPage, deletePost
} from "../../../Redux/Reducers/profile_reducer";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import PaginationPosts from "../../Common/PaginationPosts/PaginationPosts";

const Posts = props => {
    const [text, setText] = useState('');
    const [type, setType] = useState('ALL_POSTS');
    const [active, setActive] = useState('ALL_POSTS');

    const updatePostsList = () => {
        addPostText();
        setTimeout(() => props.addPostsBySorting(props.userID, type, props.currentPostPage, props.countPosts), 1000)
    }

    useEffect(() => {
        if (type === 'OWNER_POSTS') {
            setActive(type);
            props.addPostsBySorting(props.userID, type, props.currentPostPage, props.countPosts)
        } else if (type === 'FOLLOWINGS_POSTS') {
            setActive(type);
            props.addPostsBySorting(props.userID, type, props.currentPostPage, props.countPosts)
        } else if (type === 'ALL_POSTS') {
            setActive(type);
            props.addPostsBySorting(props.userID, type, props.currentPostPage, props.countPosts)
        }
    }, [props.userID, type, props.currentPostPage])

    const setPosts = (currentProps) => {
        return (
            currentProps.length !== 0 ?
                currentProps.map((post) => {
                    if (props.currentUserID === post.author && type === 'FOLLOWINGS_POSTS') {
                        return null
                    } else {
                        return <Post
                            postId={post.id}
                            currentUserID={props.currentUserID}
                            author={post.author}
                            authorName={post.authorName}
                            postText={post.postText}
                            time={post.time}
                            date={post.date}
                            key={post.id}
                            deletePost={props.deletePost}
                            filter={type}
                            currentPostPage={props.currentPostPage}
                            countPosts={props.countPosts}
                            addPostsBySorting={props.addPostsBySorting}
                        />
                    }
                }) :
                <p>Not available posts</p>
        )
    }

    const changePostText = (e) => {
        setText(e.target.value);
    };

    const addPostText = () => {
        props.addPost(props.currentUserID, text);
        setText('');
    };

    const getPosts = (typePost) => {
        setType(typePost);
        props.changeCurrentPostPage(1)
    }

    return (
        <Row className={styles.Posts}>
            <Col>
                <h3>Add post</h3>
                <div className={styles.addPost}>
                    <textarea
                        onChange={changePostText}
                        itemID='input-post'
                        placeholder='My post'
                        rows="1"
                        value={text}/>
                </div>
                <button
                    className={styles.Posts_Send}
                    onClick={() => updatePostsList()}
                >
                    <span>SEND</span>
                </button>
                <div>
                    <div className={styles.Posts_Sorting_Button_Group}>
                        <h3>Latest posts</h3>
                        <button
                            className={active === 'ALL_POSTS' ? styles.Posts_Sorting_button_active : styles.Posts_Sorting_button}
                            onClick={() => getPosts('ALL_POSTS')}
                        >
                            All
                        </button>
                        <button
                            className={active === 'FOLLOWINGS_POSTS' ? styles.Posts_Sorting_button_active : styles.Posts_Sorting_button}
                            onClick={() => getPosts('FOLLOWINGS_POSTS')}
                        >
                            Followings
                        </button>
                        <button
                            className={active === 'OWNER_POSTS' ? styles.Posts_Sorting_button_active : styles.Posts_Sorting_button}
                            onClick={() => getPosts('OWNER_POSTS')}
                        >
                            My posts
                        </button>
                    </div>
                    <div className={styles.Posts_List}>
                        {
                            setPosts(props.posts)
                        }
                        <PaginationPosts
                            countPages={props.countPages}
                            currentPostPage={props.currentPostPage}
                            changeCurrentPostPage={props.changeCurrentPostPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
};

const mapStateToProps = state => ({
    posts: state.profilePage.posts,
    currentPostPage: state.profilePage.currentPostPage,
    countPosts: state.profilePage.countPosts,
    countPages: state.profilePage.countPages,
    postText: state.profilePage.postText,
    currentUserID: state.authData.currentUserID
});

export default connect(mapStateToProps, {
    addPost, deletePost, addOwnerPosts, addFollowerPosts, addAllPosts,
    addPostsBySorting, changeCurrentPostPage
})(Posts);