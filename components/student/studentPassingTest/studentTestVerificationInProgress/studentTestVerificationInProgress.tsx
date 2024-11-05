import React, {Suspense} from "react";
import {LoaderDots} from "../../../common/loaderDots";
import styles from "./studentTestVerificationInProgressStyle.scss";

const StudentVerificationTestLazyLoadingAnimation = React.lazy(() => import('./studentVerificationTestLazyLoadingAnimation'));

function StudentTestVerificationInProgress(){
    return (
        <div className={styles.componentContainer}>
            <Suspense fallback={<LoaderDots/>}>
                <StudentVerificationTestLazyLoadingAnimation/>
            </Suspense>
            <div className={styles.testVerificationTextContainer}>
                {'Идет проверка теста...'}
            </div>
        </div>
    );
}

export default React.memo(StudentTestVerificationInProgress);
