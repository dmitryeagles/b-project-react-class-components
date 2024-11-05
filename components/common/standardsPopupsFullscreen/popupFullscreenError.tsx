import React from "react";
import {ButtonsContainer} from "../buttonsContainer";
import {PopupFullscreenWithEvents} from "../popupFullscreen";
import {PopupFullscreenBasicProps} from "../popupFullscreen/popupFullscreenWithEvents";
import {StandardButton} from "../standardButton";
import styles from "./standardsPopupsFullscreenStyles.scss";

const TEXT_BUTTON_CLOSE: string = 'Закрыть';

export interface PopupFullscreenErrorProps extends PopupFullscreenBasicProps {
    errorText: string;
    textBtnClose?: string;
}

function PopupFullscreenError(props: PopupFullscreenErrorProps) {
    return (
        <PopupFullscreenWithEvents
            eventClose={props.eventClose}
        >
            <div className={`${styles.icoError} ${styles.icoContainer}`}/>
            <div className={styles.messageContainer}>
                {props.errorText}
            </div>
            <ButtonsContainer>
                <StandardButton
                    type={'cancel'}
                    text={props.textBtnClose ?? TEXT_BUTTON_CLOSE}
                    eventClick={props.eventClose}
                />
            </ButtonsContainer>
        </PopupFullscreenWithEvents>
    );
}

export default React.memo(PopupFullscreenError);
