import React from "react";
import styles from './guestNewsItemLoadingStyle.scss';

function GuestNewsItemLoading(){
    return(
        <div className={styles.componentContainer}/>
    );
}

export default React.memo(GuestNewsItemLoading);
