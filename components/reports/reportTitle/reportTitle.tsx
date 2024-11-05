import React from "react";
import styles from './reportTitleStyle.scss';

interface ReportTitleProps {
    readonly reportName: string;
}

function ReportTitle(props: ReportTitleProps){
    return(
        <div className={styles.componentContainer}>
            {props.reportName}
        </div>
    );
}

export default React.memo(ReportTitle);