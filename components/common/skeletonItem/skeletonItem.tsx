import React from "react";
import styles from './skeletonItemStyle.scss';


const LoadingLine = React.memo(() => {
    return (
        <div className={styles.line}>
            <span className={`${styles.lineLabel} ${styles.skeleton}`}/>
            <span className={`${styles.lineContent} ${styles.skeleton}`}/>
        </div>
    );
});

function SkeletonItem() {
    return (
        <div className={styles.componentContainer}>
            <div>
                <LoadingLine/>
                <LoadingLine/>
                <LoadingLine/>
            </div>
            <div className={styles.buttonsContainer}>
                <span className={`${styles.button} ${styles.skeleton}`}/>
                <span className={`${styles.button} ${styles.skeleton}`}/>
            </div>
        </div>
    );
}

export default React.memo(SkeletonItem);
