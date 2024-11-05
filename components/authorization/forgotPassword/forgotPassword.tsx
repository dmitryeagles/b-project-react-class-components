import React from "react";
import {Link} from "react-router-dom";
import styles from './forgotPasswordStyle.scss';

interface ForgotPasswordProps {
    readonly linkPageForgotPassword: string;
}

function ForgotPassword(props: ForgotPasswordProps){
    return(
        <div className={styles.forgotPasswordContainer}>
            <Link
                to={props.linkPageForgotPassword}
            >
                {'Забыли пароль?'}
            </Link>
        </div>
    );
}

export default React.memo(ForgotPassword);
