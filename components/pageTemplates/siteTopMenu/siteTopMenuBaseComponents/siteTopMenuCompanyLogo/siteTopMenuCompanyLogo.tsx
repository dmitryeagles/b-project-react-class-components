import React from "react";
import {Link} from "react-router-dom";
import styles from "./siteTopMenuCompanyLogoStyle.scss";

interface SiteTopMenuCompanyLogoProps {
    readonly linkHomePage: string;
    readonly eventClick?: () => void;
}

/**
 * Логотип компании и ссылка вернуться Домой
 * @param props
 * @constructor
 */
function SiteTopMenuCompanyLogo(props: SiteTopMenuCompanyLogoProps) {
    return (
        <Link
            to={props.linkHomePage}
            className={styles.companyLogo}
            onClick={props.eventClick}
        >
            <span className={styles.logoHome}/>
        </Link>
    );
}

export default React.memo(SiteTopMenuCompanyLogo);
