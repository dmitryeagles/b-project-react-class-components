import React from "react";
import styles from './siteTopMenuStyle.scss';

interface SiteTopMenuProps {
    children: React.ReactNode;
}

/**
 * Компонент верхнего меню
 * @param props
 * @constructor
 */
function SiteTopMenu(props: SiteTopMenuProps) {
    return (
        <div className={styles.topMenuContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(SiteTopMenu);