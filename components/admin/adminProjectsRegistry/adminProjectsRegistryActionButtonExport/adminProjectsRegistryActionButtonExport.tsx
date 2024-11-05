import {observer} from "mobx-react";
import React from "react";
import ExcelIco from "../../../../img/svg_component/fileExcel.svg";
import {LinkAsButton} from "../../../common/linkAsButton";
import styles from './adminProjectsRegistryActionButtonExportStyle.scss';

function AdminProjectsRegistryActionButtonExport() {
    return (
        <div className={styles.componentContainer}>
            <LinkAsButton
                iconLeft={<ExcelIco/>}
                isRealLink={true}
                isDownload={true}
                href={'/Projects/Export'}
                text={'Выгрузка проектов'}
            />
        </div>
    );
}

export default observer(AdminProjectsRegistryActionButtonExport);
