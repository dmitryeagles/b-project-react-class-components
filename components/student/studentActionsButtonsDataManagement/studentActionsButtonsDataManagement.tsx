import React from "react";
import StandardButton from "../../common/standardButton/standardButton";
import styles from './studentActionsButtonsDataManagementStyle.scss';

interface StudentButtonAddNewListItemProps {
    eventStartAddNewItem: () => void;
    buttonText: string;
    buttonIco: React.ReactNode;
}

/**
 * Кнопки админа управления массивом данных (добавить, обновить)
 * @param props
 * @constructor
 */
function StudentActionsButtonsDataManagement(props: StudentButtonAddNewListItemProps) {
    return (
        <div className={styles.componentContainer}>
            <StandardButton
                type={'primary'}
                text={props.buttonText}
                eventClick={props.eventStartAddNewItem}
                iconLeft={props.buttonIco}
            />
        </div>
    );
}

export default React.memo(StudentActionsButtonsDataManagement);
