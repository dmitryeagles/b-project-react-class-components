import React, {Suspense} from "react";
import {LoaderDots} from "../../../common/loaderDots";
import styles from "./studentTestAnimationNotFoundStyle.scss";

const StudentTestAnimationNotFoundLazyLoading = React.lazy(() => import('./studentTestAnimationNotFoundLazyLoading'));

interface StudentTestVerificationInProgressProps {
    readonly notFoundText: string;
}

function StudentTestAnimationNotFound(props: StudentTestVerificationInProgressProps){
    return (
        <div className={styles.componentContainer}>
            <Suspense fallback={<LoaderDots/>}>
                <StudentTestAnimationNotFoundLazyLoading/>
            </Suspense>
            <div className={styles.textContainer}>
                {props.notFoundText}
            </div>
        </div>
    );
}

export default React.memo(StudentTestAnimationNotFound);
