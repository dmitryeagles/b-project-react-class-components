import React from "react";
import {validationString} from "ts-common-helpers";
import {FileAndFileInfo} from "../../../helpers/getFileAndFileInfo";
import CancelIco from "../../../img/svg_component/cancel.svg";
import PaperclipIco from "../../../img/svg_component/paperclip.svg";
import TrashIco from "../../../img/svg_component/trash.svg";
import {ErrorText} from "../../../interfaces/errorText";
import styles from "./fileSelectionStyle.scss";

interface FileChoiceProps {
    readonly eventSelectedFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly textFileNotSelected?: string;
    readonly acceptFileType?: string;
    readonly errorText: ErrorText;
    readonly removeCurrentFileStatus?: 'canDelete' | 'undoDeletion';
    readonly eventToggleStatusNeedRemovedCurrentFile?: ()=> void;
}

const FileChoice = React.memo((props: FileChoiceProps) => {
    return (
        <div>
            <div>
                <label className={styles.chooseFile}>
                    <PaperclipIco/>
                    {
                        validationString({
                            valueForValidation: props.textFileNotSelected,
                            defaultValue: 'Файл не выбран, выбрать файл'
                        })
                    }
                    <input
                        onChange={props.eventSelectedFile}
                        className={styles.inputFileHidden}
                        hidden={true}
                        type={'file'}
                        accept={props.acceptFileType}
                    />
                </label>
                {
                    props.removeCurrentFileStatus === 'canDelete' ?
                        <span
                            className={styles.removeCurrentFile}
                            onClick={props.eventToggleStatusNeedRemovedCurrentFile}
                        >
                            <TrashIco/>
                            <span>
                                {'Удалить существующий файл'}
                            </span>
                        </span> : null
                }
                {
                    props.removeCurrentFileStatus === 'undoDeletion' ?
                        <span
                            className={styles.removeCurrentFile}
                            onClick={props.eventToggleStatusNeedRemovedCurrentFile}
                        >
                            <CancelIco/>
                            <span>
                                {'Отменить удаление файла'}
                            </span>
                        </span> : null
                }
            </div>
            {
                props.errorText ?
                    <div className={styles.errorText}>{props.errorText}</div> :
                    null
            }
        </div>
    );
});

interface InformationAboutSelectedFileProps {
    readonly selectedFile: FileAndFileInfo;
    readonly eventResetSelectedFile: () => void;
    readonly eventSelectedFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly acceptFileType?: string;
}

const InformationAboutSelectedFile = React.memo((props: InformationAboutSelectedFileProps) => {
    return (
        <div>
            <div>
                <div className={styles.selectedFileContainer}>
                    <div className={styles.lineFileInfo}>
                        <span>{'Имя файла: '}</span>
                        <span>{props.selectedFile.fileInfo.fileName}</span>
                    </div>

                    <div className={styles.lineFileInfo}>
                        <span>{'Размер: '}</span>
                        <span>{`${props.selectedFile.fileInfo.fileSizeKb}КБ`}</span>
                    </div>

                    <div>
                        <span
                            onClick={props.eventResetSelectedFile}
                            className={`${styles.actionButton} ${styles.actionButtonResetSelectedFile}`}>
                            <CancelIco/>
                            {' Отменить выбор файла'}
                        </span>
                        <label className={`${styles.actionButton} ${styles.actionButtonChooseAnotherFile}`}>
                            <PaperclipIco/>
                            {' Выбрать другой файл'}
                            <input
                                onChange={props.eventSelectedFile}
                                className={styles.inputFileHidden}
                                hidden={true}
                                type={'file'}
                                accept={props.acceptFileType}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
});

interface FileSelectionProps extends FileChoiceProps {
    readonly selectedFile: FileAndFileInfo | undefined;
    readonly eventResetSelectedFile: () => void;
}

function FileSelection(props: FileSelectionProps) {
    if (!props.selectedFile) {
        return (
            <FileChoice
                eventToggleStatusNeedRemovedCurrentFile={props.eventToggleStatusNeedRemovedCurrentFile}
                eventSelectedFile={props.eventSelectedFile}
                removeCurrentFileStatus={props.removeCurrentFileStatus}
                errorText={props.errorText}
                acceptFileType={props.acceptFileType}
                textFileNotSelected={props.textFileNotSelected}
            />
        );
    }

    return (
        <InformationAboutSelectedFile
            eventSelectedFile={props.eventSelectedFile}
            selectedFile={props.selectedFile}
            eventResetSelectedFile={props.eventResetSelectedFile}
            acceptFileType={props.acceptFileType}
        />
    );
}

export default React.memo(FileSelection);
