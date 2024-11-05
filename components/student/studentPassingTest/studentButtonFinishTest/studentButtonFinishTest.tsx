import React from "react";
import styles from './studentButtonFinishTestStyle.scss';

interface StudentButtonFinishTestProps {
    eventClick: () => void;
}

function StudentButtonFinishTest(props: StudentButtonFinishTestProps) {
    return (
        <button
            className={styles.buttonFinishTest}
            onClick={props.eventClick}
        >
            {'Завершить тест'}
        </button>
    );
}

export default React.memo(StudentButtonFinishTest);
