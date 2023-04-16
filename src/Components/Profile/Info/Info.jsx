import React, {useEffect, useState} from 'react';
import styles from './Info.module.css';
import {Col, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";

const Info = props => {
    let params = useParams();
    const navigate = useNavigate();

    const [experiences, setExperiences] = useState([]);

    useEffect( () => {
        setExperiences(props.info.experience);
    }, [props.info.experience]);

    const toDownloadFile = (userID, target) => {
        props.downloadFile(userID, target.files[0]);
    }

    const addToConversation = (sender, receiver, currentUserID) => {
        props.createConversation(sender, receiver, currentUserID);
        navigate(`/dialogs`);
    }

    const displayLastOnline = (lastOnline) => {
        if (lastOnline === 0) {
            return `Last seen less 1 minute ago`
        } else if (lastOnline > 0 && lastOnline < 60) {
            return `Last seen ${lastOnline} minutes ago`
        } else if (lastOnline >= 60 && lastOnline < 1440) {
            return `Last seen ${(lastOnline / 60).toFixed(0)} h ${(lastOnline%60)} min ago`
        } else if (lastOnline > 1440 && lastOnline < 525600) {
            return `Last seen ${(lastOnline / 60 / 24).toFixed(2)} days ago`
        } else if (lastOnline > 525600) {
            return `Last seen ${(lastOnline / 60 / 24 / 365).toFixed(2)} years ago`
        }
        return lastOnline;
    };

    return (
        <Row className={styles.Info_Container}>
            <Col lg={4} sm={12} md={6} className={styles.Info_Sidebar}>
                <Col className={styles.Info_Sidebar_Avatar}>
                    <img src={props.userAvatar} alt="user photo"/>
                    {
                        params.userID === props.currentUserID ?
                            <div className={styles.Info_Sidebar_Button_div}>
                                <label htmlFor="avatar"
                                       className={styles.Info_Sidebar_Button}><span>CHANGE AVATAR</span></label>
                                <input
                                    type={"file"}
                                    id={'avatar'}
                                    name={'avatar'}
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => toDownloadFile(props.currentUserID, e.currentTarget)}
                                />
                            </div>
                            : props.isAuth ?
                            <button
                                className={styles.Info_Sidebar_Button}
                                onClick={() => addToConversation(props.currentUserID, params.userID, props.currentUserID)}
                            >
                                <span>SEND MESSAGE</span>
                            </button>
                            : null
                    }
                </Col>
                <div className={styles.Info_Sidebar_contacts}>
                    <h3>Contacts</h3>
                    <div>
                        {
                            props.phoneNumber && <><p><span>Phone:</span></p>
                                <p>
                                    <span><a href={`tel:${props.phoneNumber}`}>{props.phoneNumber}</a></span>
                                </p>
                            </>
                        }
                        <p><span>Email:</span></p>
                        <p>
                            <span><a href={`mailto:${props.email}`}>{props.email}</a></span>
                        </p>
                    </div>
                </div>
                <div className={styles.Info_Sidebar_techSkills}>
                    <h3>Tech Skills</h3>
                    {props.techSkills.length !== 0 ?
                        <ul>{props.techSkills.map((skill, index) => {
                            return <li key={index}><span>{skill}</span></li>
                        })}</ul> : <span>No skills</span>}
                </div>
                <div className={styles.Info_Sidebar_softSkills}>
                    <h3>Soft Skills</h3>
                    {props.softSkills.length !== 0 ?
                        <ul>{props.softSkills.map((skill, index) => {
                            return <li key={index}><span>{skill}</span></li>
                        })}</ul> : <span>No skills</span>}
                </div>
            </Col>
            <Col lg={8} sm={12} md={6} className={styles.Main_content}>
                <div className={styles.Main_content_Title}>
                    <p>
                        {
                            props.usersOnline.includes(params.userID) ?
                                <span>Online</span> :
                                <span>
                                    {
                                        props.users.map(user => user.id === params.userID && displayLastOnline(user.lastSeen))
                                    }
                                </span>
                        }
                    </p>
                    <h2>{props.jobDescription ? props.jobDescription : "Job description"}</h2>
                    <h1>{props.info.firstName} {props.info.lastName}</h1>
                    <p>{props.info.aboutMe !== '' ? props.info.aboutMe : "About me"}</p>
                </div>
                <div className={styles.Main_content_Projects}>
                    <h3>Projects</h3>
                    {
                        props.info.projects.length !== 0 ?
                            <ol>
                                {
                                    props.info.projects.map((project, index) => {
                                        return <li key={index}><Row>
                                            <Col lg={8} md={12} xs={12} className={styles.Main_content_Projects_col1}>
                                            <span>
                                                <a href={project[0]}>{project[0]}</a>
                                            </span>
                                            </Col>
                                            <Col lg={4} md={12} xs={12}
                                                 className={styles.Main_content_Projects_col2}>[ <span>{project[1]}</span> ]</Col>
                                        </Row>
                                        </li>
                                    })
                                }
                            </ol> : <h4>No projects</h4>
                    }
                </div>
                <div className={styles.Main_content_Work}>
                    <h3>Work Experience</h3>
                    {
                        experiences.length !== 0 ?
                            experiences.map((exp, index) => {
                                return (
                                    <div key={index}>
                                        <h4>{exp[0][0]} <span>{exp[0][1]}</span></h4>
                                        <p>{exp[0][2]} | {exp[0][3]}</p>
                                        <ul>
                                            {
                                                exp[1].map((expDescr, index) => {
                                                    return (
                                                        <li key={index}>{expDescr}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                            :
                            <div>
                                <h4>Profession <span>Company</span></h4>
                                <p>Period | Country</p>
                            </div>
                    }
                </div>
                <div className={styles.Main_content_Education}>
                    <h3>Education</h3>
                    <div>
                        <h4>{props.info.education.institution ? props.info.education.institution : "Educational institution"}</h4>
                        <h5>{props.info.education.educProfession ? props.info.education.educProfession : "Profession"}</h5>
                        {
                            props.info.education.educPeriod && props.info.education.educCountry ?
                                <p>{props.info.education.educPeriod} | {props.info.education.educCountry}</p> :
                                <p>Period | Country</p>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default Info;
