import React from "react";
import styles from './popupFullscreenStyle.scss';
import {showHiddenDocumentBodyOverflow} from "./showHiddenDocumentBodyOverflow";

export interface PopupFullscreenBasicProps {
    eventClose: () => void;
}

interface PopupFullscreenWithEventsProps extends PopupFullscreenBasicProps {
    children: React.ReactNode;
}

/**
 * Контейнер всплывающего окна
 * Содержит события, слушает клавиатуру для закрытия при нажатии Esc
 * Имеет кнопку в шапке для закрытия (крестик)
 */
export default class PopupFullscreenWithEvents extends React.PureComponent<PopupFullscreenWithEventsProps> {
    constructor(props: PopupFullscreenWithEventsProps) {
        super(props);
    }

    private _eventClosePopupPressEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.props.eventClose();
        }
    }

    componentDidMount() {
        this._eventClosePopupPressEscape = this._eventClosePopupPressEscape.bind(this);
        document.addEventListener("keydown", this._eventClosePopupPressEscape);
        showHiddenDocumentBodyOverflow(false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._eventClosePopupPressEscape);
        showHiddenDocumentBodyOverflow(true);
    }

    render() {
        return (
            <div className={styles.popupBackground}>
                <div className={styles.popupBody}>
                    <div className={styles.containerButtonClose}>
                    <span
                        onClick={this.props.eventClose}
                        className={styles.buttonClosePopup}
                    />
                    </div>
                    <div className={styles.popupContentContainerWithCloseButton}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
