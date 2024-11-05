import React from "react";
import StandardButton from "../../common/standardButton/standardButton";
import styles from './adminActionsButtonsDataManagementStyle.scss';

interface AdminButtonAddNewListItemProps {
    eventStartAddNewItem: () => void;
    buttonText: string;
    buttonIco: React.ReactNode;
}

/**
 * Кнопки админа управления массивом данных (добавить, обновить)
 * @param props
 * @constructor
 */
function AdminActionsButtonsDataManagement(props: AdminButtonAddNewListItemProps) {
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

export default React.memo(AdminActionsButtonsDataManagement);
