import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import styles from "./Form.module.css";
import {NavLink} from "react-router-dom";

const Form = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [regData, setRegData] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const [errors, setErrors] = useState({firstName: null, lastName: null, mail: null, pass: null});

    let regexUserName = /^[a-zA-Z0-9]{3,12}$/i;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword = /^[a-zA-Z0-9]{8,12}$/;

    const navigate = useNavigate();
    useEffect(() => {
        if (props.isLogged) {
            navigate(`/profile/${props.currentUserID}`);
        }
    }, [props.currentUserID, props.isLogged]);

    useEffect(() => {
        if (props.firstName && props.lastName && props.email && props.password) {
            if (errors.firstName !== '' || errors.lastName !== '' || errors.mail !== '' || errors.pass !== '') {
                setIsSubmit(false);
            } else {
                setIsSubmit(true);
            }
        }

        if (props.email && props.password) {
            if (errors.mail !== '' || errors.pass !== '') {
                setIsSubmit(false);
            } else {
                setIsSubmit(true);
            }
        }
    }, [errors]);

    useEffect(() => {
        if (isSubmit && regData !== null) {

            props.onSubmit(regData.firstName, regData.lastName, regData.mail, regData.pass);
        }
    }, [regData]);

    const addFirstName = (target) => {
        setFirstName(target.value);
    };

    const addLastName = (target) => {
        setLastName(target.value);
    };

    const setMail = (target) => {
        setEmail(target.value);
    };

    const setPassword = (target) => {
        setPass(target.value);
    };

    const setRegistrationData = () => {
        setRegData({firstName, lastName, mail, pass});
    };

    const validateFirstName = (target) => {
        if (target.value.match(regexUserName)) {
            setErrors({...errors, firstName: ''});
        } else {
            setErrors({...errors, firstName: "First name must contains over 3 symbols"});

        }
    }

    const validateLastName = (target) => {
        if (target.value.match(regexUserName)) {
            setErrors({...errors, lastName: ''});
        } else {
            setErrors({...errors, lastName: "Last name must contains over 3 symbols"});
        }
    }

    const validateValueEmail = (target) => {
        if (target.value.match(regexEmail)) {
            setErrors({...errors, mail: ''});
        } else {
            setErrors({...errors, mail: "Incorrect email"});
        }
    }

    const validateValuePassword = (target) => {
        if (target.value.match(regexPassword)) {
            setErrors({...errors, pass: ''});
        } else {
            setErrors({...errors, pass: "Incorrect password"});
        }
    }

    return (
        <div className={styles.Form}>
            {
                props.typeForm === 'login' ?
                <h2>Welcome to<img src={props.logo} alt="logo" /></h2> :
                <h2>Sign up to<img src={props.logo} alt="logo" /></h2>
            }
            {
                props.messageFromServer ?
                    <div className={styles.System_message_visible}><span>{props.messageFromServer}</span></div> :
                    <div className={styles.System_message_hidden}></div>
            }
            <div className={styles.Form_block}>
                {
                    props.firstName && <div className={styles.Form_el}>
                        <div className={errors.firstName !== null ? styles.Visible : styles.Form_el_error}><span>{errors.firstName}</span></div>
                        <label htmlFor="firstName">Your first name</label>
                        <input
                            type="text"
                            id={'firstName'}
                            onChange={(e) => addFirstName(e.target)}
                            onBlur={(e) => validateFirstName(e.target)}
                            value={firstName}
                            placeholder='First Name'
                        />
                    </div>
                }
                {
                    props.lastName && <div className={styles.Form_el}>
                        <div className={errors.lastName !== null ? styles.Visible : styles.Form_el_error}><span>{errors.lastName}</span></div>
                        <label htmlFor="lastName">Your last name</label>
                        <input
                            type="text"
                            id={'lastName'}
                            onChange={(e) => addLastName(e.target)}
                            onBlur={(e) => validateLastName(e.target)}
                            value={lastName}
                            placeholder='Last Name'
                        />
                    </div>
                }
                {
                    props.email && <div className={styles.Form_el}>
                        <div className={errors.mail !== null ? styles.Visible : styles.Form_el_error}><span>{errors.mail}</span></div>
                        <label htmlFor="email">Your email</label>
                        <input
                            type="text"
                            id={'email'}
                            onChange={(e) => setMail(e.target)}
                            onBlur={(e) => validateValueEmail(e.target)}
                            value={mail}
                            placeholder='Your email'
                        />
                    </div>
                }
                {
                    props.password && <div className={styles.Form_el}>
                        <div className={errors.pass !== null ? styles.Visible : styles.Form_el_error}><span>{errors.pass}</span></div>
                        <label htmlFor="password">Your password</label>
                        <input
                            type="password"
                            id={'password'}
                            onChange={(e) => setPassword(e.target)}
                            onBlur={(e) => validateValuePassword(e.target)}
                            value={pass}
                            placeholder='Enter password'
                        />
                    </div>
                }
                <div className={styles.Form_Action}>
                    <div className={styles.Form_Submit} onClick={() => setRegistrationData()}>
                        <span>{props.typeForm === 'login' ? 'LOG IN' : 'SIGN UP'}</span>
                    </div>
                    {
                        props.typeForm === 'login' ?
                            <NavLink
                                className={styles.Form_Other_action}
                                to={"/registration"}
                                onClick={() => props.setTypeAuthorization('REGISTRATION')}
                            >
                                Create account
                            </NavLink> :
                            <NavLink
                                className={styles.Form_Other_action}
                                to={"/login"}
                                onClick={() => props.setTypeAuthorization('LOGIN')}
                            >
                                Return to Log in
                            </NavLink>
                    }
                </div>
            </div>
        </div>
    )
};

export default Form;