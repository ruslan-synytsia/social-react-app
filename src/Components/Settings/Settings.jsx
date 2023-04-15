import React, {useState} from 'react';
import {connect} from "react-redux";
import styles from './Settings.module.css';
import {Col, Row, Container} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    addAboutMe, addEducation, addExperience,
    addProjects,
    addUserJobTitle,
    addUserPhoneNumber,
    addUserSkills
} from "../../Redux/Reducers/profile_reducer";

const Settings = (props) => {
    const [userPhone, setUserPhone] = useState('');
    const [techSkills, setTechSkills] = useState('');
    const [softSkills, setSoftSkills] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [linkProject, setLinkProject] = useState('');
    const [skillsProject, setSkillsProject] = useState('');
    const [projectsValue, setProjectsValue] = useState([]);
    const [isSended, setIsSended] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [profession, setProfession] = useState('');
    const [company, setCompany] = useState('');
    const [period, setPeriod] = useState('');
    const [country, setCountry] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [experience, setExperience] = useState([]);
    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(true);
    const [tab3, setTab3] = useState(true);
    const [save1, setSave1] = useState(false);
    const [save2, setSave2] = useState(false);
    const [save3, setSave3] = useState(false);
    const [isSendExpDisbl, setIsSendExpDisbl] = useState(true);
    const [institution, setInstitution] = useState('');
    const [educProfession, setEducProfession] = useState('');
    const [educPeriod, setEducPeriod] = useState('');
    const [educCountry, setEducCountry] = useState('');

    const saveProject = (arr, setArr, val1, val2) => {
        setArr([...arr, [val1, val2]]);
        setLinkProject('');
        setSkillsProject('');
    }

    const sendProjects = () => {
        props.addProjects(props.currentUserID, projectsValue)
        setIsSended(true);
        setIsSaved(false)
    }

    const saveExperience = (isDisable) => {
        let array = responsibilities.split('/')
        setExperience([...experience, [[profession, company, period, country], array]]);
        setProfession('');
        setCompany('');
        setPeriod('');
        setCountry('');
        setResponsibilities('');
        setIsSendExpDisbl(false);
        isDisable(true)
    }

    const sendExperience = () => {
        props.addExperience(props.currentUserID, experience);
        setProfession('');
        setCompany('');
        setPeriod('');
        setCountry('');
        setResponsibilities('');
        setIsSendExpDisbl(true);
        experience.length === 3 && setIsSendExpDisbl(true);
    }

    const sendEducation = () => {
        props.addEducation(props.currentUserID, {institution, educProfession, educPeriod, educCountry});
    }

    return (
        <div>
            <Container>
                <div className={styles.Settings_profile_wrapper}>
                    <Row>
                        <Col lg={12} className={styles.Settings_profile_Title}>
                            <h2>To receive a full CV, please fill in all fields</h2>
                        </Col>
                        <Col lg={12}>
                            <Accordion>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="0">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>Job
                                        description</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_Job_description}>
                                            <label htmlFor="job-title">Job title</label>
                                            <input
                                                className={styles.Settings_profile_body_input}
                                                type="text"
                                                id="job-title"
                                                onChange={(e) => setJobTitle(e.target.value)}
                                                placeholder="Front-End Developer"
                                            />
                                            <div>
                                                {
                                                    jobTitle != '' ?
                                                        <button className={styles.Settings_profile_button}
                                                                onClick={() => props.addUserJobTitle(props.currentUserID, jobTitle)}>ADD
                                                        </button> :
                                                        <button className={styles.Settings_profile_button_disabled}
                                                                disabled>ADD</button>
                                                }
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="1">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>About me</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_About_me}>
                                            <label htmlFor="job-title">Shot description</label>
                                            <textarea className={styles.Settings_profile_body_textarea}
                                                      type="text"
                                                      id="job-title"
                                                      onChange={(e) => setAboutMe(e.target.value)}
                                                      placeholder=""
                                            />
                                            <div>
                                                {
                                                    aboutMe !== '' ?
                                                        <button className={styles.Settings_profile_button}
                                                                onClick={() => props.addAboutMe(props.currentUserID, aboutMe)}>
                                                            ADD
                                                        </button> :
                                                        <button className={styles.Settings_profile_button_disabled}
                                                                disabled>ADD</button>
                                                }
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="2">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>My phone</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_Phone_number}>
                                            <label htmlFor="phone-number">Phone Number</label>
                                            <input
                                                className={styles.Settings_profile_body_input}
                                                type="text"
                                                id="phone-number"
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                placeholder="+181234567890"
                                            />
                                            <div>
                                                {
                                                    userPhone !== '' ?
                                                        <button className={styles.Settings_profile_button}
                                                                onClick={() => props.addUserPhoneNumber(props.currentUserID, userPhone)}>ADD
                                                        </button> :
                                                        <button className={styles.Settings_profile_button_disabled}
                                                                disabled>ADD</button>
                                                }
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="3">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>Skills</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_Skills}>
                                            <div>
                                                <label htmlFor="tech-skills">Tech Skills</label>
                                                <input
                                                    className={styles.Settings_profile_body_input}
                                                    type="text"
                                                    id="tech-skills"
                                                    onChange={(e) => {
                                                        setTechSkills(e.target.value)
                                                    }}
                                                    placeholder="HTML, CSS, JS..."
                                                />
                                                <div>
                                                    {
                                                        techSkills !== '' ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => props.addUserSkills('tech', props.currentUserID, techSkills.replace(/\s/g, '').split(','))}>
                                                                ADD
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>ADD</button>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="tech-skills">Soft Skills</label>
                                                <input
                                                    className={styles.Settings_profile_body_input}
                                                    type="text"
                                                    id="soft-skills"
                                                    onChange={(e) => setSoftSkills(e.target.value)}
                                                    placeholder="SCRUM, TeamWork, Agile..."
                                                />
                                                <div>
                                                    {
                                                        softSkills !== '' ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => props.addUserSkills('soft', props.currentUserID, softSkills.replace(/\s/g, '').split(','))}>ADD
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>ADD</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="4">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>My projects</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_Projects}>
                                            <div className={styles.Settings_profile_Projects_Link}>
                                                <label htmlFor="link-project">Link<span
                                                    className={styles.required}>*</span></label>
                                                <input
                                                    className={styles.Settings_profile_body_input}
                                                    type="text"
                                                    id='link-project'
                                                    onChange={(e) => {
                                                        setLinkProject(e.target.value)
                                                    }}
                                                    placeholder='link-project.com'
                                                    value={linkProject}
                                                />
                                            </div>
                                            <div className={styles.Settings_profile_Projects_Skills}>
                                                <label htmlFor="skills-project">Skills<span
                                                    className={styles.required}>*</span></label>
                                                <input
                                                    className={styles.Settings_profile_body_input}
                                                    type="text"
                                                    id='skills-project'
                                                    onChange={(e) => {
                                                        setSkillsProject(e.target.value)
                                                        setIsSended(false)
                                                    }}
                                                    placeholder='HTML5, CSS3, JS...'
                                                    value={skillsProject}
                                                />
                                            </div>
                                            <div className={styles.Settings_profile_Projects_List}>
                                                <label htmlFor="projects-list">Projects List</label>
                                                {
                                                    projectsValue.length === 0 ?
                                                        <p>Projects list is empty</p>
                                                        :
                                                        <ol>
                                                            {
                                                                projectsValue.map((project, index) => {
                                                                    return <li key={index}>{`Link project: ${project[0]} Skills: ${project[1]}`}</li>
                                                                })
                                                            }
                                                        </ol>
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.Settings_profile_Projects_Group_buttons}>
                                            {
                                                linkProject !== '' && skillsProject !== '' ?
                                                    <button className={styles.Settings_profile_button}
                                                            onClick={() => {
                                                                setIsSaved(true)
                                                                saveProject(projectsValue, setProjectsValue, linkProject, skillsProject)
                                                            }}>SAVE PROJECT</button>
                                                    :
                                                    <button className={styles.Settings_profile_button_disabled}
                                                            disabled>SAVE PROJECT</button>
                                            }
                                            {
                                                projectsValue.length === 0 || isSended || !isSaved ?
                                                    <button className={styles.Settings_profile_button_disabled}
                                                            disabled>LOAD</button> :
                                                    <button className={styles.Settings_profile_button}
                                                            onClick={() => sendProjects()}>LOAD</button>
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="5">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>Work Experiernce</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <Tabs
                                            className={styles.Settings_profile_Experiernce}
                                            defaultActiveKey="company1"
                                            id="fill-tab-example"
                                            className="mb-3"
                                            fill
                                        >
                                            <Tab
                                                className={styles.Settings_profile_Experiernce_tab}
                                                eventKey="company1"
                                                title="First company"
                                                disabled={tab1}
                                            >
                                                <div>
                                                    <h3>First company</h3>
                                                    <label htmlFor="company1">Name company<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="company1"
                                                        type="text"
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        placeholder="company"
                                                        value={company}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="country1">Country<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="country1"
                                                        type="text"
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        placeholder="Country"
                                                        value={country}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="profession1">Profession<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="profession1"
                                                        type="text"
                                                        onChange={(e) => setProfession(e.target.value)}
                                                        placeholder="profession"
                                                        value={profession}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="period1">Period<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="period"
                                                        type="text"
                                                        onChange={(e) => setPeriod(e.target.value)}
                                                        placeholder="october 2016 - now"
                                                        value={period}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="responsibilities1">Responsibilities<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="responsibilities"
                                                        type="text"
                                                        onChange={(e) => setResponsibilities(e.target.value)}
                                                        placeholder="Responsibility1/Responsibility2/Responsibility3/..."
                                                        value={responsibilities}
                                                    />
                                                </div>
                                                <div>
                                                    {
                                                        save1 === false && company !== '' && country !== '' && profession !== '' && period !== '' && responsibilities !== '' ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => saveExperience(setSave1)}>SAVE
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SAVE</button>
                                                    }
                                                    {
                                                        isSendExpDisbl === false ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => {
                                                                        sendExperience();
                                                                        setTab1(true);
                                                                        setTab2(false);
                                                                    }}>SEND
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SEND</button>
                                                    }
                                                </div>
                                            </Tab>
                                            <Tab
                                                className={styles.Settings_profile_Experiernce_tab}
                                                eventKey="company2"
                                                title="Second company"
                                                disabled={tab2}
                                            >
                                                <div>
                                                    <h3>Second company</h3>
                                                    <label htmlFor="company2">Name company<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="company2"
                                                        type="text"
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        placeholder="company"
                                                        value={company}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="country2">Country<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="country2"
                                                        type="text"
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        placeholder="Country"
                                                        value={country}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="profession2">Profession</label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="profession2"
                                                        type="text"
                                                        onChange={(e) => setProfession(e.target.value)}
                                                        placeholder="profession"
                                                        value={profession}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="period2">Period<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="period2"
                                                        type="text"
                                                        onChange={(e) => setPeriod(e.target.value)}
                                                        placeholder="october 2016 - now"
                                                        value={period}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="responsibilities2">Responsibilities<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="responsibilities2"
                                                        type="text"
                                                        onChange={(e) => setResponsibilities(e.target.value)}
                                                        placeholder="Responsibility1/Responsibility2/Responsibility3/..."
                                                        value={responsibilities}
                                                    />
                                                </div>
                                                <div>
                                                    {
                                                        save2 === false && company !== '' && country !== '' && profession !== '' && period !== '' && responsibilities !== '' ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => saveExperience(setSave2)}>SAVE</button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SAVE</button>
                                                    }
                                                    {
                                                        isSendExpDisbl === false ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => {
                                                                        sendExperience();
                                                                        setTab2(true);
                                                                        setTab3(false);
                                                                    }}>SEND
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SEND</button>
                                                    }
                                                </div>
                                            </Tab>
                                            <Tab
                                                className={styles.Settings_profile_Experiernce_tab}
                                                eventKey="company3"
                                                title="Third company"
                                                disabled={tab3}
                                            >
                                                <div>
                                                    <h3>Third company</h3>
                                                    <label htmlFor="company3">Name company<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="company3"
                                                        type="text"
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        placeholder="company"
                                                        value={company}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="country3">Country<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="country3"
                                                        type="text"
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        placeholder="Country"
                                                        value={country}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="profession3">Profession<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="profession3"
                                                        type="text"
                                                        onChange={(e) => setProfession(e.target.value)}
                                                        placeholder="profession"
                                                        value={profession}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="period3">Period<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="period3"
                                                        type="text"
                                                        onChange={(e) => setPeriod(e.target.value)}
                                                        placeholder="october 2016 - now"
                                                        value={period}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="responsibilities3">Responsibilities<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="responsibilities3"
                                                        type="text"
                                                        onChange={(e) => setResponsibilities(e.target.value)}
                                                        placeholder="Responsibility1/Responsibility2/Responsibility3/..."
                                                        value={responsibilities}
                                                    />
                                                </div>
                                                <div>
                                                    {
                                                        save3 === false && company !== '' && country !== '' && profession !== '' && period !== '' && responsibilities !== '' ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => saveExperience(setSave3)}>SAVE
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SAVE
                                                            </button>
                                                    }
                                                    {
                                                        isSendExpDisbl === false ?
                                                            <button className={styles.Settings_profile_button}
                                                                    onClick={() => {
                                                                        sendExperience()
                                                                    }}>SEND
                                                            </button> :
                                                            <button className={styles.Settings_profile_button_disabled}
                                                                    disabled>SEND
                                                            </button>
                                                    }
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className={styles.Settings_profile_Item} eventKey="6">
                                    <Accordion.Header><h3 className={styles.Settings_profile_Item_h3}>Education</h3>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.Settings_profile_body}>
                                        <div className={styles.Settings_profile_Education}>
                                            <div>
                                                <div>
                                                    <label htmlFor="institution">Educational institution<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="institution"
                                                        type="text"
                                                        placeholder="My institution"
                                                        onChange={(e) => setInstitution(e.target.value)}
                                                        value={institution}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label htmlFor="profession">My profession<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="profession"
                                                        type="text"
                                                        placeholder="My profession"
                                                        onChange={(e) => setEducProfession(e.target.value)}
                                                        value={educProfession}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label htmlFor="period">Period<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="period"
                                                        type="text"
                                                        placeholder="october 2016 - now"
                                                        onChange={(e) => setEducPeriod(e.target.value)}
                                                        value={educPeriod}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label htmlFor="country">Country<span
                                                        className={styles.required}>*</span></label>
                                                    <input
                                                        className={styles.Settings_profile_body_input}
                                                        id="country"
                                                        type="text"
                                                        placeholder="Ukraine"
                                                        onChange={(e) => setEducCountry(e.target.value)}
                                                        value={educCountry}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    institution !== '' && educProfession !== '' && educPeriod !== '' && educCountry !== '' ?
                                                        <button className={styles.Settings_profile_button}
                                                                onClick={() => sendEducation()}>ADD
                                                        </button> :
                                                        <button className={styles.Settings_profile_button_disabled}
                                                                disabled>ADD</button>
                                                }
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
};

const mapStateToProps = state => ({
    currentUserID: state.authData.currentUserID,
    phoneNumber: state.profilePage.info.contacts.phoneNumber,
    projects: state.profilePage.info.projects,
});

export default connect(mapStateToProps, {
    addUserPhoneNumber, addUserSkills, addUserJobTitle, addAboutMe,
    addProjects, addExperience, addEducation
})(Settings);