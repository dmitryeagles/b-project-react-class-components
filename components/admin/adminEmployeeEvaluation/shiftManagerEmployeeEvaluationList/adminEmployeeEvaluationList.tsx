import {observer} from "mobx-react";
import React from "react";
import {AdminAttestationEmployeeEvaluation} from "../../../../interfaces/api/adminAttestationEmployeeEvaluation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentEmployeeEvaluation
} from "../../../../stores/admin/employeeEvaluation/storeAdminPageContentEmployeeEvaluation";
import {AdminLabelWithContainerLine} from "../../../admin/adminLabelWithContainerLine";
import AdminListItemContainer, {
    AdminActionButtonsProps
} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import styles from './adminEmployeeEvaluationListStyle.scss';

interface EmployeeEvaluationItemProps extends AdminActionButtonsProps {
    readonly employeeEvaluation: AdminAttestationEmployeeEvaluation;
}

const EmployeeEvaluationItem = React.memo((props: EmployeeEvaluationItemProps) => {
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

function AdminEmployeeEvaluationList(props: SmartComponentProps<StoreAdminPageContentEmployeeEvaluation>) {

    const dataOnCurrentPage: AdminAttestationEmployeeEvaluation[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют данные для отображения'}/>
        );
    }

    return (
        <div className={styles.componentContainer}>
            {dataOnCurrentPage.map((item) =>
                <EmployeeEvaluationItem
                    key={item.uuid}
                    itemId={item.uuid}
                    employeeEvaluation={item}
                    eventDeleteItem={props.store.eventStartDeleteItem}
                    eventStartEdit={props.store.eventStartChangeItem}
                />
            )}
        </div>
    );
}

export default observer(AdminEmployeeEvaluationList);
