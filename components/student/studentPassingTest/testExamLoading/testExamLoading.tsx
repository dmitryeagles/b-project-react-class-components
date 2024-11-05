import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationGears from "../../../../lottieAnimation/gears.json";
import styles from "./testExamLoadingStyle.scss";

interface TestExamLoadingProps {
    readonly loadingText: string;
}

function TestExamLoading(props: TestExamLoadingProps) {
    return (
        <div className={styles.componentContainer}>
            <div>
                <Lottie
                    className={styles.animationContainer}
                    animationData={lottieAnimationGears}
                    play={true}
                    loop={true}
                />
            </div>
            <div className={styles.loadingText}>{props.loadingText}</div>
        </div>
    );
}

export default React.memo(TestExamLoading);
