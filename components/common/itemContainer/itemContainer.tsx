import React from "react";
import styles from './itemContainerStyle.scss';

interface EditableItemContainerProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}

function ItemContainer(props: EditableItemContainerProps) {
    return (
        <div
            className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(ItemContainer);
