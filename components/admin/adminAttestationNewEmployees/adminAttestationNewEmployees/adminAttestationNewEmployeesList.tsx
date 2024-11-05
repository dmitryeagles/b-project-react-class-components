import {observer} from "mobx-react";
import React from "react";
import {AdminAssignation, AdminAssignationExamTestStatus} from "../../../../interfaces/api/adminAssignation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentAttestationNewEmployee
} from "../../../../stores/admin/attestationNewEmployee/storeAdminPageContentAttestationNewEmployee";
import {
    EditableItemActionButtons,
    EditableItemLargeButton,
    ItemContainer,
    ItemContentContainer
} from "../../../common/itemContainer";
import {EditableItemEvents} from "../../../common/itemContainer/editableItemActionButtons/editableItemActionButtons";

import {ItemsContainer} from "../../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../../common/labelWithContainerOnOneLine";
import {StubEmptyData} from "../../../common/stubEmptyData";
import styles from "./adminAttestationNewEmployeesListStyle.scss";

//region Статус теста
interface TestResultProps {
    readonly result: AdminAssignationExamTestStatus;
}

const TestResult = React.memo((props: TestResultProps) => {
    if (props.result === 'success') {
        const statusTextSuccess: string = 'Сдал';
        return (<span title={statusTextSuccess} className={styles.statusItem__succeeded}>{statusTextSuccess}</span>);
    }

    if (props.result === 'failed') {
        const statusTextFailed: string = 'Не сдал';
        return (<span title={statusTextFailed} className={styles.statusItem__failed}>{statusTextFailed}</span>);
    }
    const statusTextNotStart: string = 'Не приступал';
    return (<span title={statusTextNotStart} className={styles.statusItem__assigned}>{statusTextNotStart}</span>);
});
//endregion

//region Элемент списка
interface AttestationNewEmployeesItemProps extends EditableItemEvents {
    readonly assignation: AdminAssignation;
    readonly linkToDetailReport: string;
}

const AttestationNewEmployeesItem = React.memo((props: AttestationNewEmployeesItemProps) => {
    return (
        <ItemContainer>
            <ItemContentContainer>
                <LabelWithContainerOnOneLine label='Сотрудник'>
                    {props.assignation.userFIO}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label='Завод:'>
                    {props.assignation.userFactoryName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label='Название теста:'>
                    {props.assignation.testAttemptName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label='Подразделение:'>
                    {props.assignation.userUnitName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label='Продолжительность теста:'>
                    {props.assignation.testTestDurationSeconds}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label='Должность:'>
                    {props.assignation.userPositionName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Проходной балл:'}>
                    {props.assignation.passingScore}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Статус:'}>
                    <TestResult result={props.assignation.examTestResult}/>
                </LabelWithContainerOnOneLine>
            </ItemContentContainer>
            <EditableItemActionButtons
                eventDeleteItem={props.eventDeleteItem}
                eventStartEdit={props.eventStartEdit}
                itemUuid={props.itemUuid}
            />
            {
                props.assignation.examTestResult !== 'notStart' ?
                    <EditableItemLargeButton
                        linkOrEvent={`${props.linkToDetailReport}/${props.assignation.resultId}`}
                        buttonText={'Подробно'}
                    /> : null
            }
        </ItemContainer>
    );
});
//endregion

const AdminAttestationNewEmployeesList = (props: SmartComponentProps<StoreAdminPageContentAttestationNewEmployee>) => {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {dataOnCurrentPage.map((item) =>
                <AttestationNewEmployeesItem
                    key={item.uuid}
                    itemUuid={item.uuid}
                    eventDeleteItem={props.store.eventStartDeleteItem}
                    assignation={item}
                    linkToDetailReport={props.store.linkDetailReport}
                />)}
        </ItemsContainer>
    );
};

export default observer(AdminAttestationNewEmployeesList);
