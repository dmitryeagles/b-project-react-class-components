import React from "react";
import styles from './simpleDictionaryItemStyle.scss';

interface SimpleDictionaryItemProps {
    readonly itemUuid: string;
    readonly value: string | number;
    readonly eventStartEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly eventDeleteItem: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function SimpleDictionaryItem(props: SimpleDictionaryItemProps) {
    return (
        <div className={styles.dictionaryItemLine}>
            <div className={styles.dictionaryValue}>
                {props.value}
            </div>
            <div className={styles.actionsButtonsContainer}>
                <span
                    className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                    data-id={props.itemUuid}
                    onClick={props.eventStartEdit}
                >
                    {'Изменить'}
                </span>

                <span
                    className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                    data-id={props.itemUuid}
                    onClick={props.eventDeleteItem}
                >
                    {'Удалить'}
                </span>
            </div>
        </div>
    );
}

export default React.memo(SimpleDictionaryItem);