import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationReportSearch from "../../../lottieAnimation/reportSearch.json";
import styles from "./reportAnimationEmptyReportStyle.scss";

function ReportAnimationEmptyReportLazyLoading(){
    return(
        <Lottie
            className={styles.animationContainer}
            animationData={lottieAnimationReportSearch}
            speed={0.5}
            play={true}
        />
    );
}

export default React.memo(ReportAnimationEmptyReportLazyLoading);
