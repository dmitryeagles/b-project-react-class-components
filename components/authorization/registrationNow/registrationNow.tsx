import React from "react";
import {Link} from "react-router-dom";
import styles from './registrationNowSyle.scss';

interface RegistrationNowProps {
    linkPageRegistration: string;
}

function RegistrationNow(props: RegistrationNowProps) {

    return (
        <div className={styles.registrationNowContainer}>
            <span>{'Нет аккауна?'}</span>
            <Link
                className={styles.linkRegistration}
                to={props.linkPageRegistration}
            >
                {'Зарегистрироваться'}
            </Link>
        </div>
    );
}

export default React.memo(RegistrationNow);
