import React, {Suspense} from "react";
import {LoaderDots} from "../../common/loaderDots";
import styles from "./reportAnimationEmptyReportStyle.scss";

const ReportAnimationEmptyReportLazyLoading = React.lazy(() => import('./reportAnimationEmptyReportLazyLoading'));

interface StudentTestVerificationInProgressProps {
    readonly publicText: string;
}

function ReportAnimationEmptyReport(props: StudentTestVerificationInProgressProps){
    return (
        <div className={styles.componentContainer}>
            <Suspense fallback={<LoaderDots/>}>
                <ReportAnimationEmptyReportLazyLoading/>
            </Suspense>
            <div className={styles.textContainer}>
                {props.publicText}
            </div>
        </div>
    );
}

export default React.memo(ReportAnimationEmptyReport);
