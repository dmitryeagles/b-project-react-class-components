import React from "react";
import styles from './simpleDictionaryItemsListContainerStyle.scss';

interface SimpleDictionaryItemsListContainerProps {
   children: React.ReactNode;
}

function SimpleDictionaryItemsListContainer(props:SimpleDictionaryItemsListContainerProps){
    return(
        <div className={styles.componentContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(SimpleDictionaryItemsListContainer);