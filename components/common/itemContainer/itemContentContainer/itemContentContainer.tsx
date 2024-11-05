import React from "react";
import styles from './itemContentContainerStyle.scss';

interface ItemContentContainerProps {
    readonly children: React.ReactNode;
}

function ItemContentContainer(props:ItemContentContainerProps){
    return(
        <div className={styles.componentContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(ItemContentContainer);