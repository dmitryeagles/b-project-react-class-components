import React from "react";
import styles from './stubReportContentStyle.scss';

type ReportStatus = 'empty' | 'error' | 'notCreated';

interface StubReportContentProps {
    readonly status: ReportStatus;
    readonly text: string;
}


function getCssClassStatus(status: ReportStatus): string {
    const statusDictionary: Record<ReportStatus, string> = {
        empty: styles.imageStatusEmpty,
        error: styles.imageStatusError,
        notCreated: styles.imageStatusNotCreated
    };

    if (statusDictionary.hasOwnProperty(status)) {
        return statusDictionary[status];
    }

    return statusDictionary.error;
}

/**
 * Заглушка контента отчета
 * @param props 
 * @returns 
 */
function StubReportContent(props: StubReportContentProps) {
    const cssClassStatus: string = getCssClassStatus(props.status);

    return (
        <div className={styles.componentContainer}>
            <div className={`${styles.imageContainer} ${cssClassStatus}`}/>
            <div className={styles.textContainer}>{props.text}</div>
        </div>
    );
}

export default React.memo(StubReportContent);
