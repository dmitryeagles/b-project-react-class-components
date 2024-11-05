import React from "react";
import {fixedLengthString} from "ts-common-helpers";
import {showHiddenDocumentBodyOverflow} from "../../common/popupFullscreen/showHiddenDocumentBodyOverflow";
import styles from "./projectFullScreenImagePopupStyle.scss";

interface AdminPopupEditorProps {
    readonly eventClosePopup: () => void;
    readonly imagePublicName: string;
    readonly imageUrl: string;
}

/**
 * Модальное окно редактирование данных
 */
class ProjectFullScreenImagePopup extends React.PureComponent<AdminPopupEditorProps> {

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

    constructor(props: AdminPopupEditorProps) {
        super(props);
        this._eventClosePopupPressEscape = this._eventClosePopupPressEscape.bind(this);
    }

    render() {
        return (
            <div className={styles.popupBackground}>
                <div className={styles.popupContent}>
                    <span
                        onClick={this.props.eventClosePopup}
                        className={styles.buttonClosePopup}
                    />
                    {
                        this.props.imagePublicName ?
                            <div className={styles.imagePublicName}>
                                {
                                    fixedLengthString({
                                        maxLength: 50,
                                        stringToFixed: this.props.imagePublicName
                                    })
                                }
                            </div> : null
                    }
                    <img
                        alt={this.props.imagePublicName}
                        src={this.props.imageUrl}
                    />
                </div>
            </div>
        );
    }
}

export default React.memo(ProjectFullScreenImagePopup);
