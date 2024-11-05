import React from "react";
import styles from './adminExamTestActionButtonsForItemStyle.scss';

export interface AdminExamTestActionButtonsForItemProps {
    readonly itemUuid: string;
    readonly eventStartEditItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AdminExamTestActionButtonsForItem(props: AdminExamTestActionButtonsForItemProps) {
    return (
        <div className={styles.buttonsActionsContainer}>
            <button
                data-id={props.itemUuid}
                onClick={props.eventStartDeleteItem}
                className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                {'Удалить'}
            </button>
            {
                props.eventStartEditItem ?
                    <button
                        data-id={props.itemUuid}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                        onClick={props.eventStartEditItem}
                    >
                        {'Изменить'}
                    </button> : null
            }
        </div>
    );
}

export default React.memo(AdminExamTestActionButtonsForItem);