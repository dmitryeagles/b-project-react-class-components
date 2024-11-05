import React from "react";
import styles from "./stubDataLoadingStyle.scss";

interface StubDataLoadingProps {
    readonly loadingDataText: string;
}

function StubDataLoading(props: StubDataLoadingProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.imageContainer}/>
            <div className={styles.loadingDataTextContainer}>{props.loadingDataText}</div>
            <div className={styles.spinnerBox}>
                <div className={styles.pulseContainer}>
                    <div className={`${styles.pulseBubble} ${styles.pulseBubble1}`}/>
                    <div className={`${styles.pulseBubble} ${styles.pulseBubble2}`}/>
                    <div className={`${styles.pulseBubble} ${styles.pulseBubble3}`}/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(StubDataLoading);