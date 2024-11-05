import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreDataPagination} from "../../../stores/common/storeDataPagination";
import {DropdownSelect} from "../dropdownSelect";
import styles from './paginateStyle.scss';

const TEXT_TOTAL_ITEMS: string = 'Всего элементов: ';

function Paginate(props: SmartComponentProps<StoreDataPagination<any>>) {

    if (!props.store.auxiliaryData) {
        return null;
    }

    if (!props.store.paginationSelectedData) {
        return null;
    }

    if (props.store.isEmptyData) {
        return null;
    }

    return (
        <div className={styles.componentContainer}>
            <div className={styles.paginationLine}>
                <DropdownSelect
                    isSearchable={false}
                    className={styles.dropdownContainer}
                    optionsList={props.store.auxiliaryData.listItemsOnPage}
                    eventChange={props.store.eventChangeItemsOnPage}
                    selectedValue={props.store.paginationSelectedData.selectedItemsOnPage}
                />

                <div className={styles.paginationContainer}>
                <span
                    className={`${styles.arrowNexPrevious} ${styles.arrowPrevious}`}
                    onClick={props.store.eventClickPrevBtn}
                />
                    <DropdownSelect
                        isSearchable={false}
                        className={styles.dropdownContainer}
                        optionsList={props.store.auxiliaryData.listPages}
                        eventChange={props.store.eventChangeCurrentPage}
                        selectedValue={props.store.paginationSelectedData.selectedCurrentPage}
                    />
                    <span
                        className={`${styles.arrowNexPrevious} ${styles.arrowNext}`}
                        onClick={props.store.eventClickNextBtn}
                    />
                </div>
            </div>
            <div className={styles.lineHelpInfo}>
                <div className={styles.totalItemsContainer}>
                    <span>{TEXT_TOTAL_ITEMS}</span>
                    <span className={styles.itemsCount}>{props.store.auxiliaryData.totalItemsCount}</span>
                </div>
            </div>
        </div>
    );
}

export default observer(Paginate);
