import React from "react";
import {Link} from "react-router-dom";
import styles from "./siteTopMenuItemAuthUserNameStyle.scss";

interface SiteTopMenuItemAuthUserNameProps {
    readonly linkCurrentUserInfo: string;
    readonly eventCloseNavMenu: () => void;
    readonly currentUserName: string;
}

function SiteTopMenuItemAuthUserName(props: SiteTopMenuItemAuthUserNameProps) {
    return (
        <>
            <Link
                className={`${styles.fullSizeBtn} ${styles.loginUserName}`}
                to={props.linkCurrentUserInfo}
                onClick={props.eventCloseNavMenu}
            >
                {props.currentUserName}
            </Link>

            <Link
                className={`${styles.mobileBtnCurrentUser} ${styles.mobileBtn}`}
                to={props.linkCurrentUserInfo}
                title={props.currentUserName}
                onClick={props.eventCloseNavMenu}
            />
        </>
    );
}

export default React.memo(SiteTopMenuItemAuthUserName);
