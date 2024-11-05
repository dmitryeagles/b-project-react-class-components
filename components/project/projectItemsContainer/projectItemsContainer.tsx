import React from "react";
import styles from "./projectItemsContainerStyle.scss";

type DisplayType = '1_column' | '2_column';

interface ItemsContainerProps {
    readonly children: React.ReactNode;
    readonly displayType: DisplayType;
}

function getCssClass(displayType: DisplayType){
    if(displayType === '2_column') {
        return styles.displayItems2Column;
    }

    return styles.displayItems1Column;
}

function ProjectItemsContainer(props: ItemsContainerProps) {
    let cssClass = getCssClass(props.displayType);

    return (
        <div className={`${styles.componentContainer} ${cssClass}`}>
            {props.children}
        </div>
    );
}

export default React.memo(ProjectItemsContainer);