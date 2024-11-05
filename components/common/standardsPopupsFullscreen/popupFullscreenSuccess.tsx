import React from "react";
import {ButtonsContainer} from "../buttonsContainer";
import {PopupFullscreenWithEvents} from "../popupFullscreen";
import {PopupFullscreenBasicProps} from "../popupFullscreen/popupFullscreenWithEvents";
import {StandardButton} from "../standardButton";
import styles from "./standardsPopupsFullscreenStyles.scss";

const TEXT_BUTTON_CLOSE: string = 'Закрыть';

export interface PopupFullscreenSuccessProps extends PopupFullscreenBasicProps {
    successText: string;
    textBtnClose?: string;
}

function PopupFullscreenSuccess(props: PopupFullscreenSuccessProps) {
    return (
        <PopupFullscreenWithEvents
            eventClose={props.eventClose}
        >
            <div className={`${styles.icoSuccess} ${styles.icoContainer}`}/>
            <div className={styles.messageContainer}>
                {props.successText}
            </div>
            <ButtonsContainer>
                <StandardButton
                    type={'ok'}
                    text={props.textBtnClose ?? TEXT_BUTTON_CLOSE}
                    eventClick={props.eventClose}
                />
            </ButtonsContainer>
        </PopupFullscreenWithEvents>
    );
}

export default React.memo(PopupFullscreenSuccess);
