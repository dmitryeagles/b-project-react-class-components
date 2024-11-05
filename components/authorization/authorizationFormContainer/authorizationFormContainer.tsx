import React from "react";
import styles from "./authorizationFormContainerStyle.scss";

interface AuthorizationFormContainerProps {
    children: React.ReactNode;
    titleTextAuthorizationForm?: string;
}

function AuthorizationFormContainer(props: AuthorizationFormContainerProps) {
    return (
        <form className={styles.loginFormContainer} autoComplete={'on'}>
            {
                props.titleTextAuthorizationForm ?
                    <div className={styles.formTitleContainer}>
                        {props.titleTextAuthorizationForm}
                    </div> : null
            }
            {props.children}
        </form>
    );
}

export default React.memo(AuthorizationFormContainer);
