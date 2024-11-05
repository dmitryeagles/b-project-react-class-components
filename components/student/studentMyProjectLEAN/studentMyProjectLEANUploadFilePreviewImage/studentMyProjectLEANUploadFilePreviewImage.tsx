import React from "react";
import {ErrorText} from "../../../../interfaces/errorText";
import styles from './studentMyProjectLEANUploadFilePreviewImageStyle.scss';

interface StudentMyProjectLEANUploadFilePreviewImageProps {
    classNameAreaAction: string;
    previewImagePath?: string;
    eventSelectedPreviewImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSelectedPreviewImageFile: boolean;
    eventResetSelectedPreviewImageFile: () => void;
    errorText: ErrorText;
}

function StudentMyProjectLEANUploadFilePreviewImage(props: StudentMyProjectLEANUploadFilePreviewImageProps) {
    return (
        <>
            {
                props.previewImagePath ?
                    <img src={props.previewImagePath}/> :
                    <div className={styles.withoutPreviewImage}/>
            }
            <div className={`${styles.areaActionButtonsUploadImgFile} ${props.classNameAreaAction}`}>
                <div className={styles.actionButtonsContainer}>
                    {
                        <label className={styles.actionButtonAddFileContainer}>
                            <input
                                className={styles.inputFileImage}
                                type={'file'}
                                onChange={props.eventSelectedPreviewImageFile}
                            />

                            <span className={`${styles.actionButton} ${styles.actionButtonAddFile}`}>
                                {'Выбрать изображение'}
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
                                    {'Отменить выбор'}
                                </span>
                            </div> 
                        : null
                    }
                </div>
            </div>
            {
                props.errorText ? <div className={styles.errorTextInvalidFileImg}>{props.errorText}</div> : null
            }

        </>
    );
}

export default React.memo(StudentMyProjectLEANUploadFilePreviewImage);
