import {observer} from "mobx-react";
import React from "react";
import CancelIco from "../../../../img/svg_component/cancel.svg";
import PaperclipIco from "../../../../img/svg_component/paperclip.svg";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreSelectedFile} from "../../../../stores/common/storeSelectedFile";
import styles from "./adminUsersSelectedFileStyle.scss";

function AdminUsersSelectedFile(props: SmartComponentProps<StoreSelectedFile>) {
    if (!props.store.selectedFile) {
        return (
            <div>
                <label className={styles.chooseFile}>
                    <PaperclipIco/>
                    {'Файл не выбран, выбрать файл'}
                    <input
                        onChange={props.store.eventSelectedFile}
                        className={styles.inputFileHidden}
                        hidden={true}
                        type={'file'}
                        accept={'.csv'}
                    />
                </label>
                {
                    props.store.errorText ?
                        <div className={styles.errorText}>{props.store.errorText}</div> :
                        null
                }
            </div>
        );
    }

    return (
        <div>
            <div className={styles.selectedFileTitle}>{'Выбран файл:'}</div>
            <div>
                <div className={styles.selectedFileContainer}>
                    <div className={styles.lineFileInfo}>
                        <span>{'Имя файла: '}</span>
                        <span>{props.store.selectedFile.fileInfo.fileName}</span>
                    </div>

                    <div className={styles.lineFileInfo}>
                        <span>{'Размер: '}</span>
                        <span>{`${props.store.selectedFile.fileInfo.fileSizeKb}КБ`}</span>
                    </div>

                    <div className={styles.actionButtonsContainer}>
                        <span
                            onClick={props.store.eventResetSelectedFile}
                            className={`${styles.actionButton} ${styles.actionButtonResetSelectedFile}`}>
                            <CancelIco/>
                            {' Отменить выбор файла'}
                        </span>
                        <label className={`${styles.actionButton} ${styles.actionButtonChooseAnotherFile}`}>
                            <PaperclipIco/>
                            {' Выбрать другой файл'}
                            <input
                                onChange={props.store.eventSelectedFile}
                                className={styles.inputFileHidden}
                                hidden={true}
                                type={'file'}
                                accept={'.csv'}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(AdminUsersSelectedFile);
