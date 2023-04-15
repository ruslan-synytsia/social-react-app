import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import styles from '../Dialogs/Dialogs.module.css';
import {addSocketIO} from "../../Redux/Reducers/profile_reducer";
import {addCompanions, getConversation, sendMessages} from "../../Redux/Reducers/messages_reducer";

const Dialogs = props => {
    const [date, setDate] = useState(null);
    const [text, setText] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [companionsList, setCompanionsList] = useState([]);
    const [companionID, setCompanionID] = useState(null);
    const [compThumbnail, setCompThumbnail] = useState('');
    const [conversationID, setConversationID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(null);
    const [enableSend, setEnableSend] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        setDate(new Date().toLocaleDateString());
        props.socketIO.emit('GET_COMPANIONS_LIST', props.currentUserID);
        props.socketIO.on('GET_COMPANIONS_LIST_REQ', companions => setCompanionsList(companions));
        props.socketIO.on('GET_CONVERSATION_REQ', conversation => setConversationID(conversation));
        props.socketIO.on('GET_MESSAGES_REQ', messages => setMessages(messages));
        props.socketIO.on('SEND_MESSAGE_REQ', message => setMessage(message));
    }, [])

    useEffect(() => {
        props.socketIO.emit('GET_MESSAGES', conversationID);
    }, [conversationID]);

    useEffect(() => {
        if (message !== null && message.conversationId === conversationID) {
            setMessages([...messages, message])
        }
    }, [message]);

    useEffect(() => {
        if (messages.length > 0 && scrollRef !== null) {
            scrollRef.current.scrollIntoView({block: "nearest"});
        }
    }, [messages]);

    const getConversation = (currentUserId, companionId, compThumb) => {
        props.socketIO.emit('GET_CONVERSATION', {
            userId: currentUserId,
            companionId: companionId
        });
        setEnableSend(true);
        setCompThumbnail(compThumb)
        setCompanionID(companionId);
        setActiveItem(companionId);
    };

    const re = new RegExp('^(?!\\s*$).+');
    const sendMessage = (conversationId, senderId, companionId, text) => {
        if (re.test(text)) {
            props.socketIO.emit('SEND_MESSAGE', {
                conversationId: conversationId,
                senderId: senderId,
                companionId: companionId,
                text: text,
                time: new Date().toLocaleTimeString().slice(0,-3),
                date: new Date().toLocaleDateString()
            });
        }
        setText('');
    };

    return (
        <div>
            {console.log(companionsList)}
            <Container>
                <Row className={styles.Dialogs}>
                    <Col>
                        <div className={styles.Dialogs_List}>
                            {
                                companionsList.length !== 0 ?
                                    companionsList.map(companion => {
                                        return (
                                            <div
                                                className={activeItem === companion.id ? styles.Dialogs_List_Item_Active : styles.Dialogs_List_Item}
                                                key={companion.id}
                                                onClick={() => getConversation(props.currentUserID, companion.id, companion.thumbnail)}
                                            >
                                                <img className={styles.Dialogs_List_Item_img}
                                                     src={companion.thumbnail} alt=""/>
                                                <span>{`${companion.firstName} ${companion.lastName}`}</span>
                                            </div>
                                        )
                                    }) :
                                    <span>List companions is empty</span>
                            }
                        </div>
                    </Col>
                    <Col md={8}>
                        {
                            activeItem !== null ?
                                <>
                                    <div className={styles.Dialogs_Messages}>
                                        {
                                            messages.map(message => {
                                                if (message.senderId) {
                                                    if (message.senderId !== props.currentUserID) {
                                                        return (
                                                            <div
                                                                key={message._id}
                                                                className={styles.Dialogs_Messages_Item_into}
                                                                ref={scrollRef}
                                                            >
                                                                <div className={styles.Dialogs_Messages_Item_content}>
                                                                    <img src={compThumbnail} alt=""/>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Date}>
                                                                        {
                                                                            message.date === date ? 'Today' : message.date
                                                                        }
                                                                    </span>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Time}>{message.time}</span>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Text}>{message.text}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div
                                                                key={message._id}
                                                                className={styles.Dialogs_Messages_Item_out}
                                                                ref={scrollRef}
                                                            >
                                                                <div className={styles.Dialogs_Messages_Item_content}>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Date}>
                                                                        {
                                                                            message.date === date ? 'Today' : message.date
                                                                        }
                                                                    </span>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Time}>{message.time}</span>
                                                                    <span className={styles.Dialogs_Messages_Item_content_Text}>{message.text}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                    <div className={enableSend ? styles.Dialogs_Send_message : styles.Dialogs_Send_message_disable}>
                                <textarea
                                    autoFocus={true}
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                />
                                        <button
                                            onClick={() => sendMessage(conversationID, props.currentUserID, companionID, text)}
                                        >
                                            SEND
                                        </button>
                                    </div>
                                </> :
                                <div className={styles.Dialogs_void}>
                                    <h3>Please, select user</h3>
                                </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

const mapStateToProps = state => ({
    connection: state.profilePage.connection,
    socketIO: state.profilePage.socketIO,
    currentUserID: state.authData.currentUserID,
    listCompanions: state.messages.listCompanions
})

export default connect(mapStateToProps, {addSocketIO, addCompanions, getConversation, sendMessages})(Dialogs);