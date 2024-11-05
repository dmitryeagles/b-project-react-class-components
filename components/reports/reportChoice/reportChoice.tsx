import React from "react";
import {Link} from "react-router-dom";
import {SitePageInfo} from "../../../interfaces/sitePageInfo";
import styles from './reportChoiceStyle.scss';

interface ReportItemProps {
    readonly reportInfo: SitePageInfo;
}

const ReportItem = React.memo((props: ReportItemProps) => {
    return (
        <Link
            className={styles.reportLink}
            to={props.reportInfo.fullPath}
        >
            {props.reportInfo.pagePublicName}
        </Link>
    );
});

interface ReportChoiceProps {
    readonly reportsPagesList: SitePageInfo[];
}

/**
 * Ссылки на страницы с отчетами
 * @param props
 * @constructor
 */
function ReportChoice(props: ReportChoiceProps) {

    const reportsListElements: JSX.Element[] = [];

    for (let i = 0; i < props.reportsPagesList.length; ++i) {
        reportsListElements.push(
            <ReportItem
                key={props.reportsPagesList[i].uuid}
                reportInfo={props.reportsPagesList[i]}
            />
        );
    }

    return (
        <div>
            {reportsListElements}
        </div>
    );
}

export default React.memo(ReportChoice);