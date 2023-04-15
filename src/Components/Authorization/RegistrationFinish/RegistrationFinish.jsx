import React from "react";
import styles from "./RegistrationFinish.module.css";

const RegistrationFinish = () => {
    return (
        <div className={styles.Registration_Finish_Message}>
            <div>
                <img src="/smile.png" alt="smile"/>
                <h1>Thank you for registration!</h1>
                <p>A registration confirmation message has been sent to your email. To complete registration, go to your email, please.</p>
            </div>
        </div>
    )
};

export default RegistrationFinish;