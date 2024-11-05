import {observer} from "mobx-react";
import React from "react";
import {
    ShiftManagerAttestationEmployeeEvaluation
} from "../../../../interfaces/api/shiftManagerAttestationEmployeeEvaluation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreShiftManagerPageContentEmployeeEvaluation
} from "../../../../stores/shiftManager/employeeEvaluation/storeShiftManagerPageContentEmployeeEvaluation";
import {AdminLabelWithContainerLine} from "../../../admin/adminLabelWithContainerLine";
import AdminListItemContainer, {
    AdminActionButtonsProps
} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";

interface ShiftManagerEmployeeEvaluationItemProps extends AdminActionButtonsProps {
    employeeEvaluation: ShiftManagerAttestationEmployeeEvaluation;
}

const ShiftManagerEmployeeEvaluationItem = React.memo((props: ShiftManagerEmployeeEvaluationItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'ФИО сотрудника:'}>
                {props.employeeEvaluation.userFullName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Значение:'}>
                {props.employeeEvaluation.scoreValue}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function ShiftManagerEmployeeEvaluationList (props: SmartComponentProps<StoreShiftManagerPageContentEmployeeEvaluation>){

    const dataOnCurrentPage: ShiftManagerAttestationEmployeeEvaluation[] = props.store.storeDataPagination.dataOnCurrentPage;


    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют данные для отображения'}/>
        );
    }

    const employeeEvaluationListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        employeeEvaluationListElements.push(
            <ShiftManagerEmployeeEvaluationItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                employeeEvaluation={dataOnCurrentPage[i]}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventStartEdit={props.store.eventStartChangeItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {employeeEvaluationListElements}
        </ItemsContainer>
    );
}

export default observer(ShiftManagerEmployeeEvaluationList);
