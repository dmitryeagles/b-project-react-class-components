import React from "react";
import {showHiddenDocumentBodyOverflow} from "../../common/popupFullscreen/showHiddenDocumentBodyOverflow";
import styles from "./adminPopupStyle.scss";

interface AdminPopupProps {
    eventClosePopup: () => void;
    popupTitle: string;
    children: React.ReactNode;
    className?: string;
    classNameContentContainer?: string;
}

/**
 * Модальное окно редактирование данных
 */
class AdminPopup extends React.PureComponent<AdminPopupProps> {

    private _eventClosePopupPressEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.props.eventClosePopup();
        }
    }

    private _addEventListenersPopup() {
        document.addEventListener('keydown', this._eventClosePopupPressEscape);
    }

    private _removeEventListenersPopup() {
        document.removeEventListener('keydown', this._eventClosePopupPressEscape);
    }

    public componentWillUnmount() {
        this._removeEventListenersPopup();
        showHiddenDocumentBodyOverflow(true);
    }

    public componentDidMount() {
        this._addEventListenersPopup();
        showHiddenDocumentBodyOverflow(false);
    }

    constructor(props: AdminPopupProps) {
        super(props);
        this._eventClosePopupPressEscape = this._eventClosePopupPressEscape.bind(this);
    }

    render() {
        const cssClassPopupBody = this.props.className ? `${styles.popupBody} ${this.props.className}` : `${styles.popupBody} ${styles.popupBodySize}`;

        const cssClassPopupContent: string = this.props.classNameContentContainer ?
            `${styles.popupContent} ${this.props.classNameContentContainer}` :
            `${styles.popupContent} ${styles.popupContentSize}`;

        return (
            <div className={styles.popupBackground}>
                <div className={cssClassPopupBody}>
                    <div className={styles.containerButtonClose}>
                    <span
                        onClick={this.props.eventClosePopup}
                        className={styles.buttonClosePopup}
                    />
                    </div>
                    <div className={styles.popupContentContainer}>
                        <div className={styles.popupTitle}>{this.props.popupTitle}</div>
                        <div className={cssClassPopupContent}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPopup;
