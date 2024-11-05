import React from "react";
import FileExcelSvgIco from '../../../img/svg_component/fileExcel.svg';
import FilePdfSvgIco from '../../../img/svg_component/filePdf.svg';
import FileWordSvgIco from '../../../img/svg_component/fileWord.svg';
import SaveSvgIco from '../../../img/svg_component/save.svg';
import {LinkAsButton} from "../../common/linkAsButton";
import {StandardButton} from "../../common/standardButton";
import styles from './reportButtonsExportStyle.scss';

interface ReportButtonsExportProps {
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
    readonly exportExcelLink?: string;
    readonly eventSaveReport?: () => void;
}

function ReportButtonsExport(props: ReportButtonsExportProps) {
    return (
        <div className={styles.componentContainer}>
            {
                (typeof props.exportPDFLink === 'string') ?
                    <LinkAsButton
                        href={props.exportPDFLink}
                        isRealLink={true}
                        isDownload={true}
                        iconLeft={<FilePdfSvgIco/>}
                        text={'Экспорт PDF'}
                    /> : null
            }
            {
                (typeof props.exportWordLink === 'string') ?
                    <LinkAsButton
                        href={props.exportWordLink}
                        isRealLink={true}
                        isDownload={true}
                        text={'Экспорт Word'}
                        iconLeft={<FileWordSvgIco/>}

                    /> : null
            }
            {
                (typeof props.exportExcelLink === 'string') ?
                    <LinkAsButton
                        href={props.exportExcelLink}
                        isRealLink={true}
                        isDownload={true}
                        iconLeft={<FileExcelSvgIco/>}
                        text={'Экспорт Excel'}
                    /> : null
            }
            {
                (typeof props.eventSaveReport === 'function') ?
                    <StandardButton
                        text={'Сохранить'}
                        eventClick={props.eventSaveReport}
                        iconLeft={<SaveSvgIco/>}
                    /> : null
            }
        </div>
    );
}

export default React.memo(ReportButtonsExport);
