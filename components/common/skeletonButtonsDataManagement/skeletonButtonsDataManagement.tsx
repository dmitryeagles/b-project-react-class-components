import React from "react";
import styles from './skeletonButtonsDataManagementStyle.scss';

function SkeletonButtonsDataManagement(){
    return(
        <div className={styles.componentContainer}>
            <span className={`${styles.button} ${styles.skeleton}`}/>
        </div>
    );
}

export default React.memo(SkeletonButtonsDataManagement);
