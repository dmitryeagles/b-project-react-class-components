import React from "react";
import styles from './filterItemByIdStyle.scss';

interface FilterItemByIdProps {
    readonly itemId: string | number;
    readonly eventResetSearch: () => void;
}

function FilterItemById(props: FilterItemByIdProps) {
    return (
        <div>
            <div
                className={styles.componentContainer}>
                <span className={styles.readOnlySearchValue}>
                    <span className={styles.helpText}>{`Поиск по id: `}</span>
                    <span className={styles.selectedId}>{props.itemId}</span>
                </span>
                <span
                    className={styles.rightButton}
                    title={'Сбросить поиск'}
                    onClick={props.eventResetSearch}
                />
            </div>
        </div>
    );
}

export default React.memo(FilterItemById);
