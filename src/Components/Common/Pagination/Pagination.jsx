import React, {useEffect, useState} from "react";
import styles from "./Pagination.module.css";
import {Col} from "react-bootstrap";

const Pagination = props => {
    const [countPages, setCountPages] = useState(null);
    const [numberPortion, setNumberPortion] = useState(1);
    const [isDisableNext, setIsDisableNext] = useState(true);
    const [isDisablePrev, setIsDisablePrev] = useState(true);

    let countBtns = Math.ceil(props.totalCountUsers / props.countUsers);
    const SIZE_PORTION = 5;
    let leftBorder = (numberPortion - 1) * SIZE_PORTION + 1;
    if (leftBorder <= 0) leftBorder = 1;
    let rightBorder = numberPortion * SIZE_PORTION;
    if (rightBorder > countPages) rightBorder = countPages;

    useEffect(() => {
        setCountPages(countBtns);
        if (rightBorder === countPages) {
            setIsDisableNext(false);
        } else {
            setIsDisableNext(true);
        }
        if (leftBorder === 1) {
            setIsDisablePrev(false);
        } else {
            setIsDisablePrev(true);
        }
    }, [props.totalCountUsers, countPages, rightBorder])

    const setCurrentPage = (target) => {
        props.addCurrentPage(parseInt(target.textContent));
    }

    const listNext = () => {
        let num = numberPortion;
        num += 1;
        setNumberPortion(num);
        props.addCurrentPage(leftBorder + SIZE_PORTION);
    }
    const listPrev = () => {
        let num = numberPortion;
        num -= 1;
        setNumberPortion(num);
        props.addCurrentPage(leftBorder - 1);
    }

    const pages = () => {
        let array = [];
        for (let i = leftBorder; i <= rightBorder; i++) {
            array[i - 1] = i;
        }
        return array;
    }

    return (
        <Col className={styles.Pagination}>

                <div
                    className={isDisablePrev ? styles.Pagination_Btn_Prev : styles.disabled}
                    onClick={() => listPrev()}
                >
                    <span>PREV</span>
                </div>
                <div className={styles.Pagination_center}>
                    {
                        pages().length > 1 ?
                            pages().map(page => {
                                return <div
                                    className={props.currentPage === parseInt(page) ? styles.Pagination_Btn_Active : styles.Pagination_Btn}
                                    key={parseInt(page)}
                                    onClick={(e) => {
                                        setCurrentPage(e.target)
                                    }}
                                >
                            <span
                                key={page}
                            >{page}</span>
                                </div>}) :
                            <div></div>
                    }
                </div>
                <div
                    className={isDisableNext ? styles.Pagination_Btn_Next : styles.disabled}
                    onClick={() => listNext()}
                >
                    <span>NEXT</span>
                </div>
        </Col>
    )
};

export default Pagination;