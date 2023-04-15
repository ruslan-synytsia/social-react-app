import React from "react";
import {useParams} from "react-router";
import styles from "../NotFound/NotFound.module.css";

const NotFound = props => {
    let {link} = useParams();

    return <div className={styles.Not_found}>
        <div className={styles.Not_found_content}>
            <img src={props.logo} alt="logo"/>
            <p>Sorry, this page {process.env.REACT_APP_URL}/{link}" not found!</p>
            <p>Return to <a href={process.env.REACT_APP_URL}>{process.env.REACT_APP_URL}</a></p>
        </div>
    </div>
};

export default NotFound;