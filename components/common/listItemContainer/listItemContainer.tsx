import React from "react";
import styles from './listItemContainerStyle.scss';

export interface ActionButtonsEventsProps {
    readonly eventStartEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventDeleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ActionButtonsProps extends ActionButtonsEventsProps {
    readonly itemId: string;
    readonly buttonsText?: {
        readonly buttonOk: string;
        readonly buttonCancel: string;
    }
}

interface ListItemContainerProps extends ActionButtonsProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}

const ActionButtons = React.memo((props: ActionButtonsProps) => {
    return (
        <div className={styles.buttonsActionsContainer}>
            {
                props.eventDeleteItem ?
                    <button
                        data-id={props.itemId}
                        onClick={props.eventDeleteItem}
                        className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                        {props.buttonsText?.buttonCancel ? props.buttonsText.buttonCancel : 'Удалить'}
                    </button> : null
            }
            {
                props.eventStartEdit ?
                    <button
                        data-id={props.itemId}
                        onClick={props.eventStartEdit}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Изменить'}
                    </button> : null
            }
        </div>
    );
});

/**
 * Контейнер списка элементов, которые видит админ при работе с данными
 * @param props
 * @constructor
 */
function ListItemContainer(props: ListItemContainerProps) {
    return (
        <div
            className={props.className ? `${props.className} ${styles.componentContainer}` : `${styles.componentContainerDefaultStyle} ${styles.componentContainer}`}>
            <div>
                {props.children}
            </div>
            {
                (props.eventDeleteItem || props.eventStartEdit) ?
                    <ActionButtons
                        itemId={props.itemId}
                        eventDeleteItem={props.eventDeleteItem}
                        eventStartEdit={props.eventStartEdit}
                        buttonsText={props.buttonsText}
                    /> : null
            }
        </div>
    );
}

export default React.memo(ListItemContainer);
