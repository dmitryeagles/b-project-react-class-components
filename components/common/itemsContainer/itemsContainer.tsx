import React from "react";
import {Dictionary} from "../../../interfaces/dictionary";
import {ViewItemsType} from "../../../stores/common/storeComponentSelectViewFormatItems";
import styles from './itemsContainerStyle.scss';

interface ItemsContainerProps {
    readonly children: React.ReactNode;
    readonly viewItems: ViewItemsType;
}

const viewItemsCssClassNames: Dictionary<string, ViewItemsType> = {
    '1_column': styles.viewItemsOneColumn,
    '2_column': styles.viewItemsTwoColumn,
    '3_column': styles.viewItemsThreeColumn
}

function ItemsContainer(props: ItemsContainerProps) {
    let cssClass = styles.viewItemsOneColumn;

    if (viewItemsCssClassNames.hasOwnProperty(props.viewItems)){
        cssClass = viewItemsCssClassNames[props.viewItems];
    }

    return (
        <div className={`${styles.componentContainer} ${cssClass}`}>
            {props.children}
        </div>
    );
}

export default React.memo(ItemsContainer);
