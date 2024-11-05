import {observer} from "mobx-react";
import React from 'react';
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreFilterInputSearch} from "../../../stores/filters/storeFilterInputSearch";
import styles from './inputSearchStyle.scss';

interface InputSearchProps extends SmartComponentProps<StoreFilterInputSearch>{
    className?: string;
}

function InputSearch(props: InputSearchProps) {
    if (props.store.searchStatus.isActive) {
        return (
            <div
                className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}>
                <span className={styles.readOnlySearchValue}>
                    {props.store.searchStatus.searchQuery}
                </span>
                <span
                    className={`${styles.rightButton} ${styles.buttonReset} ${styles.iconCancel}`}
                    title={'Сбросить поиск'}
                    onClick={props.store.eventResetSearchStatus}
                />
            </div>
        );
    }

    return (
        <form
            className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}
            onSubmit={props.store.eventApplySearch}
        >
            <input
                placeholder={props.store.placeholder}
                className={styles.inputSearch}
                value={props.store.searchStatus.searchQuery}
                onChange={props.store.eventChangeSearchQuery}
                type={'text'}
            />
            <span
                className={`${styles.rightButton} ${styles.buttonSearch} ${styles.iconSearch}`}
                title={'Искать'}
                onClick={props.store.eventApplySearch}
            />
        </form>
    );
}

export default observer(InputSearch);
