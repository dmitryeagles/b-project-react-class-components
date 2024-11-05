import React from "react";
import {ButtonsContainer} from "../buttonsContainer";
import {PopupFullscreenWithEvents} from "../popupFullscreen";
import {PopupFullscreenBasicProps} from "../popupFullscreen/popupFullscreenWithEvents";
import {StandardButton} from "../standardButton";
import styles from "./standardsPopupsFullscreenStyles.scss";

const TEXT_BUTTON_YES: string = 'Да';
const TEXT_BUTTON_NO: string = 'Нет';

export interface PopupFullscreenConfirmProps extends PopupFullscreenBasicProps {
    confirmIcoType?: 'question' | 'delete'
    eventConfirm: () => void;
    confirmText: string;
    textButtons?: {
        yesButton: string;
        noButton: string;
    }
}

function PopupFullscreenConfirm(props: PopupFullscreenConfirmProps) {

    let cssClassIco: string = styles.icoConfirm;

    if(props.confirmIcoType === 'delete') {
        cssClassIco = styles.icoDelete;
    }

    return (
        <PopupFullscreenWithEvents
            eventClose={props.eventClose}
        >
            <div className={`${cssClassIco} ${styles.icoContainer}`}/>
            <div className={styles.messageContainer}>
                {props.confirmText}
            </div>
            <ButtonsContainer>
                <StandardButton
                    type={'ok'}
                    text={props.textButtons ? props.textButtons.yesButton : TEXT_BUTTON_YES}
                    eventClick={props.eventConfirm}
                />

                <StandardButton
                    className={styles.popupConfirmButtonsCancel}
                    type={'cancel'}
                    text={props.textButtons ? props.textButtons.noButton : TEXT_BUTTON_NO}
                    eventClick={props.eventClose}
                />
            </ButtonsContainer>
        </PopupFullscreenWithEvents>
    );
}

export default React.memo(PopupFullscreenConfirm);
