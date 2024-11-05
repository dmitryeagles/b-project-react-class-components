import React from "react";
import EditIco from "../../../../img/svg_component/edit.svg";
import UserPlusIco from "../../../../img/svg_component/userPlus.svg";
import StandardButton from "../../../common/standardButton/standardButton";
import styles from "./shiftManagerEmployeeEvaluationButtonsDataManagementStyle.scss";

interface ShiftManagerEmployeeEvaluationButtonsDataManagementProps {
    readonly eventStartAddNewUser: () => void;
    readonly eventStartEditUsersList: () => void;
}

function ShiftManagerEmployeeEvaluationButtonsDataManagement(props: ShiftManagerEmployeeEvaluationButtonsDataManagementProps) {
    return (
        <div className={styles.componentContainer}>
            <StandardButton
                type={'primary'}
                text={'Добавить сотрудников'}
                eventClick={props.eventStartAddNewUser}
                iconLeft={<UserPlusIco/>}
            />

            <StandardButton
                type={'primary'}
                text={'Изменить сотрудников'}
                eventClick={props.eventStartEditUsersList}
                iconLeft={<EditIco/>}
            />
        </div>
    );
}

export default React.memo(ShiftManagerEmployeeEvaluationButtonsDataManagement);
