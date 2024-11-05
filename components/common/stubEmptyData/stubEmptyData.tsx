import React from "react";
import styles from './stubEmptyDataStyle.scss';

interface StubEmptyDataProps {
    emptyDataText: string;
}

/**
 * Заглушка, пустые данные
 * @param props
 * @constructor
 */
function StubEmptyData(props: StubEmptyDataProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.imageContainer}/>
            <div className={styles.emptyDataTextContainer}>{props.emptyDataText}</div>
        </div>
    );
}

export default React.memo(StubEmptyData);
