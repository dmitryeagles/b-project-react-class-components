import {observer} from "mobx-react";
import React from "react";
import {fixedLengthString} from "../../../../helpers/fixedLengthString";
import {AdminAttestationTest, AdminAttestationUserKPI} from "../../../../interfaces/api/adminAttestation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    ATTESTATION_SCHEME_CALCULATING_VALUE_OF_INDICATOR
} from "../../../../staticData/attestationSchemeCalculatingValueOfIndicator";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from "./adminAttestationUserKPIListStyle.scss";

//region Список должностей
interface AttestationTestsListProps {
    testsList: AdminAttestationTest[];
}

const AttestationTestsList = React.memo((props: AttestationTestsListProps) => {
    if (!props.testsList.length) {
        return (<span>{'Список тестов отсутствует'}</span>)
    }

    const testsElementsList: React.ReactNode[] = [];

    for (let i = 0; i < props.testsList.length; ++i) {
        testsElementsList.push(
            <span
                key={props.testsList[i].uuid}
                className={styles.testListItem}
                title={props.testsList[i].testPublicName}
            >
                {
                    fixedLengthString({
                        maxLength: 30,
                        stringToFixed: props.testsList[i].testPublicName
                    })
                }
            </span>
        );
    }

    return (
        <>
            {testsElementsList}
        </>
    );
});
//endregion

interface AttestationUserKPIItemProps extends AdminActionButtonsProps {
    attestationUserKPI: AdminAttestationUserKPI;
}

const AttestationUserKPIItem = React.memo((props: AttestationUserKPIItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'KPI:'}
            >
                {props.attestationUserKPI.kpiName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Тесты:'}
            >
                <AttestationTestsList testsList={props.attestationUserKPI.testList}/>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Схема расчета значения показателя:'}
            >
                {props.attestationUserKPI.schemaPublicName}
            </AdminLabelWithContainerLine>
            {
                ATTESTATION_SCHEME_CALCULATING_VALUE_OF_INDICATOR.calculationPercentageByNumberOfErrors.value ===props.attestationUserKPI.schemaId ?
                    <AdminLabelWithContainerLine
                        label={'Максимально возможное количество ошибок:'}
                    >
                        {props.attestationUserKPI.maxErrorCount}
                    </AdminLabelWithContainerLine> : null
            }
            {
                props.attestationUserKPI.testList.length ? null :
                    <AdminLabelWithContainerLine
                        label={'Вес:'}
                    >
                        {props.attestationUserKPI.score}
                    </AdminLabelWithContainerLine>
            }
            {
                !props.attestationUserKPI.passingScore ? null :
                    <AdminLabelWithContainerLine
                        label={'Проходной балл для теста:'}
                    >
                        {props.attestationUserKPI.passingScore}
                    </AdminLabelWithContainerLine>
            }
        </AdminListItemContainer>
    );
});


function AdminAttestationUserKPIList(props: SmartComponentProps<StoreAdminEditAttestation>) {
    const attestationUserKPIList: AdminAttestationUserKPI[] = props.store.storeAttestationUserKPI.itemsList;

    if (!attestationUserKPIList.length) {
        return (<StubEmptyData emptyDataText={'Отсутствуют доступные KPI для отображения'}/>)
    }

    const attestationsElements: JSX.Element[] = [];

    for (let i = 0; i < attestationUserKPIList.length; ++i) {
        attestationsElements.push(
            <AttestationUserKPIItem
                key={attestationUserKPIList[i].uuid}
                itemId={attestationUserKPIList[i].uuid}
                attestationUserKPI={attestationUserKPIList[i]}
                eventStartEdit={props.store.eventStartEditAttestationUserKPI}
                eventDeleteItem={props.store.eventStartDeleteAttestationUserKPI}
            />
        );
    }

    return (
        <div className={styles.componentContainer}>
            {attestationsElements}
        </div>
    );
}

export default observer(AdminAttestationUserKPIList);
