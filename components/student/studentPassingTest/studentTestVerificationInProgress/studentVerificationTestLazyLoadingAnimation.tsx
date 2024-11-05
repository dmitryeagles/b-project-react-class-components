import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationVerificationTest from "../../../../lottieAnimation/verificationTest.json";
import styles from "./studentTestVerificationInProgressStyle.scss";

function StudentVerificationTestLazyLoadingAnimation(){
    return(
        <Lottie
            className={styles.animationContainer}
            animationData={lottieAnimationVerificationTest}
            play={true}
        />
    );
}

export default React.memo(StudentVerificationTestLazyLoadingAnimation);
