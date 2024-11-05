import React from "react";
import {StandardPanel} from "../../common/standardPanel";
import styles from './reportFilterContainerStyle.scss';

interface ReportFilterContainerProps {
    readonly children: React.ReactNode;
}

function ReportFilterContainer(props: ReportFilterContainerProps) {
    return (
        <StandardPanel className={styles.componentContainer}>
            {props.children}
        </StandardPanel>
    );
}

export default React.memo(ReportFilterContainer);