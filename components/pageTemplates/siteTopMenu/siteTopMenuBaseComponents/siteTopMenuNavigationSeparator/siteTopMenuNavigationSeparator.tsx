import React from "react";
import styles from "./siteTopMenuNavigationSeparatorStyle.scss";

interface SiteTopMenuNavigationSeparatorProps {
    readonly categoryName: string;
}

/**
 * Разделитель для элементов навигации
 * @param props
 * @constructor
 */
function SiteTopMenuNavigationSeparator(props: SiteTopMenuNavigationSeparatorProps){
    return (
        <div className={styles.navigationSeparator}>
            {props.categoryName}
        </div>
    );
}

export default React.memo(SiteTopMenuNavigationSeparator);