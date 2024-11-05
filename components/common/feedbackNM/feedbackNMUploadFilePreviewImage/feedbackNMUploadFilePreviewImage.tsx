import React from "react";
import {ErrorText} from "../../../../interfaces/errorText";
import styles from './feedbackNMUploadFilePreviewImageStyle.scss';

const TEXT_SELECT_IMAGE: string = 'Выбрать изображение';
const TEXT_CANCEL: string = 'Отменить выбор';

interface FeedbackNMUploadFilePreviewImageProps {
    classNameAreaAction?: string;
    previewImagePath?: string;
    eventSelectedPreviewImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSelectedPreviewImageFile: boolean;
    eventResetSelectedPreviewImageFile: () => void;
    errorText: ErrorText;
}

function FeedbackNMUploadFilePreviewImage(props: FeedbackNMUploadFilePreviewImageProps) {
    return (
        <>
            {
                props.previewImagePath ?
                    <img src={props.previewImagePath}/> :
                    <div className={styles.withoutPreviewImage}/>
            }
            <div className={props.classNameAreaAction ? `${styles.areaActionButtonsUploadImgFile} ${props.classNameAreaAction}` : styles.areaActionButtonsUploadImgFile}>
                <div className={styles.actionButtonsContainer}>
                    {
                        <label className={styles.actionButtonAddFileContainer}>
                            <input
                                className={styles.inputFileImage}
                                type={'file'}
                                onChange={props.eventSelectedPreviewImageFile}
                            />

                            <span className={`${styles.actionButton} ${styles.actionButtonAddFile}`}>
                                {TEXT_SELECT_IMAGE}
                            </span>
                        </label>
                    }
                    {
                        props.isSelectedPreviewImageFile ?
                            <div className={styles.actionButtonRemoveFileContainer}>
                                <span
                                    className={`${styles.actionButton} ${styles.actionButtonRemoveFile}`}
                                    onClick={props.eventResetSelectedPreviewImageFile}
                                >
                                    {TEXT_CANCEL}
                                </span>
                            </div> : null
                    }
                </div>
            </div>
            {props.errorText ? <div className={styles.errorTextInvalidFileImg}>{props.errorText}</div> : null}
        </>
    );
}

export default React.memo(FeedbackNMUploadFilePreviewImage);
