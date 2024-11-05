import React from "react";
import {Link} from "react-router-dom";
import styles from "./successConfirmEmailStyle.scss";

interface SuccessConfirmEmailProps {
    linkToLogin: string;
}

function SuccessConfirmEmail(props: SuccessConfirmEmailProps){
    return(
        <div>
            <div className={styles.icoSuccessContainer}/>
            <div className={styles.textConfirmEmailContainer}>{'Почта успешно подтверждена'}</div>
            <div className={styles.textLoginNowContainer}>
                <span>{'Теперь можно'}</span>
                <Link
                    className={styles.linkLoginNow}
                    to={props.linkToLogin}
                >
                    {'авторизоваться в системе'}
                </Link>
            </div>
        </div>
    );
}

export default React.memo(SuccessConfirmEmail);
