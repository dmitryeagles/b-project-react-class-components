import React from "react";
import {UserFeedbackProgressItem} from "../../../interfaces/api/userFeedback";
import styles from './userFeedbackProgressStyle.scss';

type ProgressTheme = 'green' | 'orange' | 'blue';

interface UserFeedbackProgressProps {
    readonly theme: ProgressTheme;
    readonly label: string;
    readonly title: string;
    readonly progress:UserFeedbackProgressItem;
}

interface ProgressLineProps{
    readonly theme: ProgressTheme;
    readonly progress:UserFeedbackProgressItem;
}

const cssThemeBackground: Record<ProgressTheme, string> = {
    blue: styles.blueLighten,
    green: styles.greenLighten,
    orange: styles.orangeLighten
}

const cssThemeColor: Record<ProgressTheme, string> = {
    blue: '#00c6ff',
    green: '#4ad295',
    orange: '#ffa200'
}

function ProgressLine(props: ProgressLineProps){
    return (
        <div className={`${styles.progressLineContainer} ${cssThemeBackground[props.theme]}`}>
            <span className={styles.progressPercent}>
                {`${props.progress.percent}%`}
            </span>
            <div
                className={styles.progressBar}
                 style={{
                     background: `linear-gradient(90deg, ${cssThemeColor[props.theme]} ${props.progress.percent}%, rgb(255 255 255) 0%)`
                 }}
            >
                {`${props.progress.current}/${props.progress.total}`}
            </div>
        </div>
    );
}


function UserFeedbackProgress(props: UserFeedbackProgressProps) {
    return (
        <div className={styles.componentContainer}>
            <span className={styles.itemTitle}>
                {props.title}
            </span>
            <div className={styles.itemContent}>
                <span className={styles.itemLabel}>
                    {props.label}
                </span>
                <ProgressLine
                    progress={props.progress}
                    theme={props.theme}
                />
            </div>
        </div>
    );
}

export default React.memo(UserFeedbackProgress);
