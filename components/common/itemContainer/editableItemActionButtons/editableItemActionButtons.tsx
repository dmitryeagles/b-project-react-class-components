import React from "react";
import styles from "./editableItemActionButtonsStyle.scss";

export interface EditableItemEvents {
    readonly itemUuid: string;
    readonly eventStartEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventDeleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface EditableItemActionButtonsProps extends EditableItemEvents{
    readonly className?: string;
    readonly buttonsText?: {
        readonly buttonOk: string;
        readonly buttonCancel: string;
    };
}

function EditableItemActionButtons(props:EditableItemActionButtonsProps){
    return (
        <div className={props.className ? props.className : styles.buttonsActionsContainer}>
            {
                props.eventDeleteItem ?
                    <button
                        data-id={props.itemUuid}
                        onClick={props.eventDeleteItem}
                        className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                        {props.buttonsText?.buttonCancel ? props.buttonsText.buttonCancel : 'Удалить'}
                    </button> : null
            }
            {
                props.eventStartEdit ?
                    <button
                        data-id={props.itemUuid}
                        onClick={props.eventStartEdit}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Изменить'}
                    </button> : null
            }
        </div>
    );
}

export default React.memo(EditableItemActionButtons);