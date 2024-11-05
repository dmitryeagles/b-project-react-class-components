import React from "react";
import styles from './siteTopMenuContentContainerStyle.scss';

interface SiteTopMenuItemsContainerProps {
    readonly children: React.ReactNode;
}

/**
 * Контейнер для контента верхнего меню
 * @param props
 * @constructor
 */
function SiteTopMenuContentContainer(props: SiteTopMenuItemsContainerProps) {
    return (
        <div className={styles.menuItemsContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(SiteTopMenuContentContainer);