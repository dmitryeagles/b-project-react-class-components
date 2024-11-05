import React from "react";
import styles from './itemTitleStyle.scss';

interface ItemTitleProps {
    readonly title: string;
}

function ItemTitle(props: ItemTitleProps) {
    return (
        <div className={styles.componentContainer}>
            {props.title}
        </div>
    );
}

export default React.memo(ItemTitle);
