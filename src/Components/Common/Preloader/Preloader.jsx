import React from "react";
import styles from './Preloader.module.css';

const Preloader = () => {
    return <div className={styles.preloaderOn}>
        <img src="/preloader.svg" alt=""/>
    </div>
};

export default Preloader;