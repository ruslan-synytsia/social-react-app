import React from "react";
import styles from "../Footer/Footer.module.css";
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <Container className={styles.Footer_Content}>
                <Row>
                    <Col md={12}>
                        <div className={styles.Footer_Content_div}>
                            <h4>Designed by [ <span>Ruslan Synytsia</span> ]</h4>
                            <p>Copyright © 2021 - 2022</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Footer;