import {observer} from "mobx-react";
import React from "react";
import ExcelIco from "../../../../img/svg_component/fileExcel.svg";
import {LinkAsButton} from "../../../common/linkAsButton";
import styles from './adminExportNMActionButtonStyle.scss';

function AdminExportNMActionButton() {
    return (
        <div className={styles.componentContainer}>
            <LinkAsButton
                iconLeft={<ExcelIco/>}
                isRealLink={true}
                isDownload={true}
                href={'/AdminNM/Export'}
                text={'Выгрузка отчета NearMiss'}
            />
        </div>
    );
}

export default observer(AdminExportNMActionButton);
