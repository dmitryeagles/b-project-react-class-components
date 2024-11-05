import React from "react";
import styles from './stubErrorGetDataStyle.scss';

interface StubErrorGetDataProps {
    errorText: string;
}

/**
 * Заглушка, ошибка при получении данных
 * @param props
 * @constructor
 */
function StubErrorGetData(props: StubErrorGetDataProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.imageContainer}/>
            <div className={styles.emptyDataTextContainer}>{props.errorText}</div>
        </div>
    );
}

export default React.memo(StubErrorGetData);
