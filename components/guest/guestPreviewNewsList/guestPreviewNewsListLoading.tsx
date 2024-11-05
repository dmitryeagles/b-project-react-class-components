import React from "react";
import GuestNewsItemLoading from "../guestNewsItemLoading/guestNewsItemLoading";
import styles from './guestPreviewNewsListStyle.scss';

function GuestPreviewNewsListLoading(){
    return (
        <div className={`${styles.bigFirstNews} ${styles.componentContainer}`}>
            <GuestNewsItemLoading/>
            <GuestNewsItemLoading/>
            <GuestNewsItemLoading/>
            <GuestNewsItemLoading/>
            <GuestNewsItemLoading/>
        </div>
    );
}

export default React.memo(GuestPreviewNewsListLoading);
