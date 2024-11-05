import {observer} from "mobx-react";
import React from "react";
import {AdminAttestationPositionKPI} from "../../../../interfaces/api/adminAttestation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from "./adminAttestationPositionKPIListStyle.scss";

interface AttestationPositionKPIItemProps extends AdminActionButtonsProps {
    attestationPositionKPI: AdminAttestationPositionKPI;
}

const AttestationPositionKPIItem = React.memo((props: AttestationPositionKPIItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'KPI:'}
            >
                {props.attestationPositionKPI.kpiName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Вес:'}
            >
                {props.attestationPositionKPI.score}
            </AdminLabelWithContainerLine>


            <AdminLabelWithContainerLine
                label={'Категория KPI:'}
            >
                {props.attestationPositionKPI.kpiCategoryName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Фактическое значение:'}
            >
                {props.attestationPositionKPI.currentValue}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});


function AdminAttestationPositionKPIListList(props: SmartComponentProps<StoreAdminEditAttestation>) {
    const attestationPositionKPIList: AdminAttestationPositionKPI[] = props.store.storeAttestationPositionKPI.itemsList;

    if (!attestationPositionKPIList.length) {
        return (<StubEmptyData emptyDataText={'Отсутствуют доступные KPI для отображения'}/>)
    }

    const attestationsElements: JSX.Element[] = [];

    for (let i = 0; i < attestationPositionKPIList.length; ++i) {
        attestationsElements.push(
            <AttestationPositionKPIItem
                key={attestationPositionKPIList[i].uuid}
                itemId={attestationPositionKPIList[i].uuid}
                attestationPositionKPI={attestationPositionKPIList[i]}
                eventStartEdit={props.store.eventStartEditAttestationPositionKPI}
                eventDeleteItem={props.store.eventStartDeleteAttestationPositionKPI}
            />
        );
    }

    return (
        <div className={styles.componentContainer}>
            {attestationsElements}
        </div>
    );
}

export default observer(AdminAttestationPositionKPIListList);
