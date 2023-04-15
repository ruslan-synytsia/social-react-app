import React, {useEffect, useState} from "react";
import styles from "../PaginationPosts/PaginationPosts.module.css"

const PaginationPosts = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberPortion, setNumberPortion] = useState(1);
    const [isDisableNext, setIsDisableNext] = useState(true);
    const [isDisablePrev, setIsDisablePrev] = useState(true);

    const setNumberCurrentPage = (target) => {
        props.changeCurrentPostPage(parseInt(target.textContent));
    }

    const SIZE_PORTION = 10;

    let leftBorder = (numberPortion - 1) * SIZE_PORTION + 1;
    if (leftBorder <= 0) leftBorder = 1;
    if (leftBorder >= currentPage && leftBorder > props.countPages) leftBorder = 1

    let rightBorder = numberPortion * SIZE_PORTION;
    if (rightBorder > props.countPages) rightBorder = props.countPages;

    useEffect(() => {
        if (rightBorder === props.countPages) {
            setIsDisableNext(true);
        } else {
            setIsDisableNext(false);
        }
        if (leftBorder === 1) {
            setIsDisablePrev(true);
        } else {
            setIsDisablePrev(false);
        }
    }, [props.countPages, rightBorder])

    const listNext = () => {
        let num = numberPortion;
        num += 1;
        setNumberPortion(num);
        setCurrentPage(leftBorder + SIZE_PORTION);
    }
    const listPrev = () => {
        let num = numberPortion;
        num -= 1;
        setNumberPortion(num);
        setCurrentPage(leftBorder - 1);
    }

    const pages = () => {
        let array = [];
        for (let i = leftBorder; i <= rightBorder; i++) {
            array[i - 1] = i;
        }
        return array;
    }

    return (
        <div className={styles.Pagination}>
            <div
                className={!isDisablePrev && leftBorder > SIZE_PORTION ? styles.Pagination_btn_Prev : styles.Pagination_btn_Prev_hidden}
                onClick={() => listPrev()}
            >
                <span>PREV</span>
            </div>
            <div className={styles.Pagination_btns_group}>
                {
                    pages().length > 1 ?
                        pages().map((btn, index) => {
                            return <div className={parseInt(btn) === props.currentPostPage ? styles.Pagination_btn_active : styles.Pagination_btn} key={index}>
                                <span className={styles.Pagination_btn_span}
                                    onClick={(e) => setNumberCurrentPage(e.target)}>
                                    {btn}
                                </span>
                            </div>
                        }) :
                        <div></div>
                }
            </div>
            <div
                className={!isDisableNext ? styles.Pagination_btn_Next : styles.Pagination_btn_Next_hidden}
                onClick={() => listNext()}
            >
                <span>NEXT</span>
            </div>
        </div>
    )
};

export default PaginationPosts;