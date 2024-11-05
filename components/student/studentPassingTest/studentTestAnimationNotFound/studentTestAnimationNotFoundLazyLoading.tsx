import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationWatchingOnShip from "../../../../lottieAnimation/watchingOnShip.json";
import styles from "./studentTestAnimationNotFoundStyle.scss";

function StudentTestAnimationNotFoundLazyLoading(){
    return(
        <Lottie
            className={styles.animationContainer}
            animationData={lottieAnimationWatchingOnShip}
            play={true}
        />
    );
}

export default React.memo(StudentTestAnimationNotFoundLazyLoading);
