import React from "react";
import styles from './authorizationInputStyle.scss';

type AuthorizationInputIco = 'user' | 'lock';

interface AuthorizationInputProps {
    value?: string;
    defaultValue?: string;
    textError?: string;
    inputType: 'text' | 'password';
    eventChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    eventFocus?: () => void;
    placeholder?: string;
    ico: AuthorizationInputIco
    isAutoComplete?: boolean;
}

function getCssClassInputIco(inputIco: AuthorizationInputIco): string {
    if (inputIco == 'lock') {
        return styles.inputIcoLock;
    }

    return styles.inputIcoLogin;
}

function AuthorizationInput(props: AuthorizationInputProps) {
    const cssClassInputStatus: string = props.textError ? styles.authorizationInputError : styles.authorizationInputNormal;
    return (
        <div className={styles.componentContainer}>
            <div className={styles.inputContainer}>
                <input
                    autoComplete={props.isAutoComplete ? 'on' : 'off'}
                    placeholder={props.placeholder}
                    className={`${styles.authorizationInput} ${cssClassInputStatus}`}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    type={props.inputType}
                    onChange={props.eventChange}
                    onFocus={props.eventFocus}
                />
                <span className={`${getCssClassInputIco(props.ico)} ${styles.inputIco}`}/>
            </div>
            {
                props.textError ? <div className={styles.errorTextContainer}>{props.textError}</div> : null
            }
        </div>
    );

}

export default React.memo(AuthorizationInput);
