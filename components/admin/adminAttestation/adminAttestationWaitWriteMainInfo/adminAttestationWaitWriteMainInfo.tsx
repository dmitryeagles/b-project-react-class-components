import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationPenWrites from "../../../../lottieAnimation/penWrites.json";
import styles from "./adminAttestationWaitWriteMainInfoStyle.scss";

function AdminAttestationWaitWriteMainInfo() {
    return (
        <div className={styles.componentContainer}>
            <div>
                <Lottie
                    className={styles.animationContainer}
                    animationData={lottieAnimationPenWrites}
                    play={true}
                    loop={true}
                />
            </div>
            <div className={styles.helpText}>
                {'Для доступа к показателям, заполните основную информацию об аттестации'}
            </div>
        </div>
    );
}

export default React.memo(AdminAttestationWaitWriteMainInfo);
