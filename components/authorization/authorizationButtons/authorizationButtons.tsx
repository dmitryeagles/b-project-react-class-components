import React from "react";
import {Link} from "react-router-dom";
import styles from './authorizationButtonsStyle.scss'


interface LinkCancelProps {
    readonly text: string;
    readonly link: string;
    readonly isRealLink?: boolean;
}

interface AuthorizationButtonsProps {
    buttonOk: {
        readonly text: string;
        readonly eventClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }

    buttonCancel?: LinkCancelProps
}

function LinkCancel(props: LinkCancelProps) {
    if (props.isRealLink) {
        return (
            <a
                href={props.link}
                className={`${styles.authorizationButton} ${styles.authorizationButtonCancel}`}
            >
                {props.text}
            </a>
        );
    }

    return (
        <Link
            to={props.link}
            className={`${styles.authorizationButton} ${styles.authorizationButtonCancel}`}
        >
            {props.text}
        </Link>
    );

}


function AuthorizationButtons(props: AuthorizationButtonsProps) {

    return (
        <div className={styles.componentContainer}>
            <button
                className={`${styles.authorizationButton} ${styles.authorizationButtonOk}`}
                type={'submit'}
                onClick={props.buttonOk.eventClick}
            >
                {props.buttonOk.text}
            </button>

            {props.buttonCancel ? <LinkCancel {...props.buttonCancel}/> : null}
        </div>
    );
}

export default React.memo(AuthorizationButtons);
