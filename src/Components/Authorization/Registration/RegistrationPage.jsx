import React, {useEffect, useState} from 'react';
import Form from '../../Common/Form/Form';
import styles from './Registration.module.css';
import {connect} from "react-redux";
import {addRegistrationAction, setTypeAuthorization} from "../../../Redux/Reducers/auth_reducer";
import {useNavigate} from "react-router";
import RegistrationFinish from "../RegistrationFinish/RegistrationFinish";

const RegistrationPage = props => {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.isLogged) {
            navigate(`/profile/${props.currentUserID}`);
        }
    }, [props.currentUserID, props.isLogged]);

    return (
        <div>
            {
                props.isRegFinish === false ?
                    <div className={styles.Registration_wrapper}>
                        <div className={styles.Registration}>
                            <Form
                                logo={props.logo}
                                onSubmit={props.addRegistrationAction}
                                firstName={true}
                                lastName={true}
                                email={true}
                                password={true}
                                typeForm={'registration'}
                                setTypeAuthorization={props.setTypeAuthorization}
                            />
                        </div>
                    </div> :
                    <RegistrationFinish />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    messageFromServer: state.authData.messageFromServer,
    isRegFinish: state.authData.isRegFinish
});

export default connect(mapStateToProps, {setTypeAuthorization, addRegistrationAction})(RegistrationPage);