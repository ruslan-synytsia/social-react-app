import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {

    const removePost = postId => {
        props.deletePost(props.currentUserID, postId, props.filter);
        setTimeout(() => {
            props.addPostsBySorting(props.currentUserID, props.filter, props.currentPostPage, props.countPosts)
        }, 1000)
    }

    return (
        <div className={styles.postItem}>
            <div className={styles.postItem_Content}>
                {
                    props.author === props.currentUserID ?
                        <div
                            className={styles.postItem_remove}
                            onClick={() => removePost(props.postId)}
                        ><span>Delete</span></div> :
                        null
                }
                <p className={styles.postItem_Content_Text}>{props.postText}</p>
                <div className={styles.dataOfPost}>
                    <div>
                        <span>
                            {`Posted by ${props.authorName}`}
                        </span>
                    </div>
                    <div>
                        <span>
                            {props.time}
                        </span>
                    </div>
                    <div>
                        <span>
                            {props.date}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export  default  Post;