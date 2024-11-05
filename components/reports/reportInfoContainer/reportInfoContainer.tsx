import React from "react";
import styles from './reportInfoContainerStyle.scss';

interface ReportInfoContainerProps {
    readonly children: React.ReactNode;
}

function ReportInfoContainer(props: ReportInfoContainerProps){
    return(
        <div className={styles.componentContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(ReportInfoContainer);