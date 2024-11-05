import React from "react";
import styles from "./reportInfoRowStyle.scss";

interface ReportInfoContainerRowProps {
    readonly label: string;
    readonly value: string | number;
}

function ReportInfoRow(props: ReportInfoContainerRowProps) {
    return (
        <div>
            <span>{`${props.label} `}</span>
            <span className={styles.textValue}>{props.value}</span>
        </div>
    );
}

export default React.memo(ReportInfoRow);