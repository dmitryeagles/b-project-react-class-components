import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {ShiftManagerAttestationUserKpi} from "../../../interfaces/api/shiftManagerAttestationUserKpi";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreShiftManagerPageContentAttestationKpi
} from "../../../stores/shiftManager/attestationKpi/storeShiftManagerPageContentAttestationKpi";
import {ItemsContainer} from "../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../common/standardPanel";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from './shiftManagerAttestationUserKpiStyle.scss';

interface ShiftManagerAttestationUserKpiItemProps {
    readonly attestationKPI: ShiftManagerAttestationUserKpi;
    readonly linkToPageEmployeeEvaluation: string;
    readonly attestationId: number;
}

const ShiftManagerAttestationUserKpiItem = React.memo((props: ShiftManagerAttestationUserKpiItemProps) => {

    return (
        <StandardPanel
            className={styles.attestationKPIItemContainer}
        >
            <div className={styles.attestationKPIItemContentContainer}>
                <div className={styles.attestationKPIName}>
                    {props.attestationKPI.kpiName}
                </div>

                <LabelWithContainerOnOneLine label={'Категория KPI:'}>
                    {props.attestationKPI.kpiCategoryName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Баллы:'}>
                    {props.attestationKPI.score}
                </LabelWithContainerOnOneLine>
            </div>
            <Link
                className={styles.linkDetail}
                to={`${props.linkToPageEmployeeEvaluation}?attestation_id=${props.attestationId}&kpi_id=${props.attestationKPI.kpiId}&factory_id=${props.attestationKPI.factoryId}`}
            >
                {'Показатели сотрудников'}
            </Link>
        </StandardPanel>
    );
});

function ShiftManagerAttestationUserKpiList(props: SmartComponentProps<StoreShiftManagerPageContentAttestationKpi>) {

    const dataOnCurrentPage: ShiftManagerAttestationUserKpi[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных KPI для отображения'}/>)
    }

    const attestationsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        attestationsElements.push(
            <ShiftManagerAttestationUserKpiItem
                key={dataOnCurrentPage[i].uuid}
                attestationKPI={dataOnCurrentPage[i]}
                attestationId={props.store.attestationId}
                linkToPageEmployeeEvaluation={props.store.linkToPageEmployeeEvaluation}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {attestationsElements}
        </ItemsContainer>
    );
}

export default observer(ShiftManagerAttestationUserKpiList);
