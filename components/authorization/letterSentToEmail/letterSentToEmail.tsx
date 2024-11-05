import React from "react";
import ButtonsContainer from "../../common/buttonsContainer/buttonsContainer";
import LinkAsButton from "../../common/linkAsButton/linkAsButton";
import styles from './letterSentToEmailStyle.scss';

interface LetterSentToEmail {
    text: string;
    linkToLogin: string;
}

function LetterSentToEmail(props: LetterSentToEmail){
    return(
        <div>
            <div className={styles.imgMailContainer}/>
            <div className={styles.helpTextContainer}>
                {props.text}
            </div>
            <ButtonsContainer>
                <LinkAsButton
                    text={'Авторизоваться'}
                    href={props.linkToLogin}
                />
            </ButtonsContainer>
        </div>
    );
}

export default React.memo(LetterSentToEmail);
