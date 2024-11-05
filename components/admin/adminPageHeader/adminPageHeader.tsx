import React from "react";
import styles from './adminPageHeaderStyle.scss';

interface AdminPageTitleProps {
    pageTitle: string;
}

/**
 * Заголовок страницы админа
 * @param props
 * @constructor
 */
function AdminPageTitle(props: AdminPageTitleProps) {
    return (
        <div className={styles.adminPageTitle}>
            {props.pageTitle}
        </div>
    );
}

export default React.memo(AdminPageTitle);
