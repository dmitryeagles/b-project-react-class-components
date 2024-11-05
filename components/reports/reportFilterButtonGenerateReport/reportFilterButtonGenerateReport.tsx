import React from "react";
import {StandardButton} from "../../common/standardButton";
import styles from "./reportFilterButtonGenerateReportStyle.scss";

interface ReportFilterButtonGenerateReportProps {
    readonly eventStartGenerateReport: () => void;
    readonly publicTextButton?: string;
    readonly disabled?: boolean;
}

function ReportFilterButtonGenerateReport(props: ReportFilterButtonGenerateReportProps) {
    return (
        <div className={styles.componentContainer}>
            <StandardButton
                text={props.publicTextButton ? props.publicTextButton : 'Сформировать'}
                eventClick={props.eventStartGenerateReport}
                type={props.disabled ? 'disabled' : undefined}
            />
        </div>
    );
}

export default React.memo(ReportFilterButtonGenerateReport);
