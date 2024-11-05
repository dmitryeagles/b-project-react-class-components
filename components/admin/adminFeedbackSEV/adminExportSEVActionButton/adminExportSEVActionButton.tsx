import {observer} from "mobx-react";
import React from "react";
import ExcelIco from "../../../../img/svg_component/fileExcel.svg";
import {LinkAsButton} from "../../../common/linkAsButton";
import styles from './adminExportSEVActionButtonStyle.scss';

function AdminExportSEVActionButton() {
    return (
        <div className={styles.componentContainer}>
            <LinkAsButton
                iconLeft={<ExcelIco/>}
                isRealLink={true}
                isDownload={true}
                href={'/AdminSev/Export'}
                text={'Выгрузка отчета SEV'}
            />
        </div>
    );
}

export default observer(AdminExportSEVActionButton);
