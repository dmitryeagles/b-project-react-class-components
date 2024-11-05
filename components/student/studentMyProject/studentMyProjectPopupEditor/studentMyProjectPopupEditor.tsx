import React from "react";
import {showHiddenDocumentBodyOverflow} from "../../../common/popupFullscreen/showHiddenDocumentBodyOverflow";
import styles from "./studentMyProjectPopupEditorStyle.scss";

interface StudentMyProjectPopupEditorProps {
    eventCloseEditor: () => void;
    eventSaveEditData: () => void;
    popupTitle: string;
    btnSaveText: string;
    children: React.ReactNode;
    className?: string;
    classNameContentContainer?: string;
}
/**
 * Модальное окно редактирование данных
 */
class StudentMyProjectPopupEditor extends React.PureComponent<StudentMyProjectPopupEditorProps> {
    private _eventClosePopupPressEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.props.eventCloseEditor();
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

    constructor(props: StudentMyProjectPopupEditorProps) {
        super(props);
        this._eventClosePopupPressEscape = this._eventClosePopupPressEscape.bind(this);
    }

    render() {
        const cssClassPopupBody = this.props.className ? `${styles.popupBody} ${this.props.className}` : `${styles.popupBody} ${styles.popupBodySize}`;
        return (
            <div className={styles.popupBackground}>
                <div className={cssClassPopupBody}>
                    <div className={styles.containerButtonClose}>
                    <span
                        onClick={this.props.eventCloseEditor}
                        className={styles.buttonClosePopup}
                    />
                    </div>
                    <div className={styles.popupContentContainer}>
                        <div className={styles.popupTitle}>{this.props.popupTitle}</div>
                        <div className={this.props.classNameContentContainer ? `${this.props.classNameContentContainer} ${styles.popupContent}`:  styles.popupContent}>
                            {this.props.children}
                        </div>
                        <div className={styles.containerActionsButtons}>
                        <span
                            className={`${styles.actionButton} ${styles.actionButtonOk}`}
                            onClick={this.props.eventSaveEditData}
                        >
                            {this.props.btnSaveText}
                        </span>
                            <span
                                className={`${styles.actionButton} ${styles.actionButtonCancel}`}
                                onClick={this.props.eventCloseEditor}
                            >
                            {'Отмена'}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentMyProjectPopupEditor;
