import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimationPenWrites from "../../../../../lottieAnimation/penWrites.json";
import styles from "./adminExamTestWaitWriteMainInfoStyle.scss";

function AdminExamTestWaitWriteMainInfo() {
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
                {'Для доступа к группам вопросов, заполните основную информацию о тесте'}
            </div>
        </div>
    );
}

export default React.memo(AdminExamTestWaitWriteMainInfo);
