import React from "react";
import styles from "./siteTopMenuItemLogoutSystemStyle.scss";

interface SiteTopMenuItemLogoutSystemProps {
    readonly linkToLogoutSystem: string;
}

/**
 * Кнопка выхода из системы
 * @param props
 * @constructor
 */
function SiteTopMenuItemLogoutSystem(props: SiteTopMenuItemLogoutSystemProps){
    return (
        <a
            className={styles.buttonLogoutSystem}
            href={props.linkToLogoutSystem}>
            {'Выход'}
        </a>
    );
}

export default React.memo(SiteTopMenuItemLogoutSystem);
