import React from "react";
import styles from "./siteTopMenuNavigationMenuOpenContainerStyle.scss";

interface SiteTopMenuNavigationMenuOpenContainerProps {
    readonly children: React.ReactNode;
    readonly eventClose: () => void;
}

/**
 * Контейнер открытого меню
 * @param props
 * @constructor
 */
function SiteTopMenuNavigationMenuOpenContainer(props: SiteTopMenuNavigationMenuOpenContainerProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.buttonCloseContainer}>
                <span
                    className={styles.buttonClose}
                    onClick={props.eventClose}
                />
            </div>
            <div className={styles.navigationContent}>
                {props.children}
            </div>
        </div>
    );
}

export default React.memo(SiteTopMenuNavigationMenuOpenContainer);
