import { observer } from "mobx-react";
import React from "react";
import { convertToNumber } from "ts-common-helpers";
import { StoreDisplayedData } from "ts-mobx-data-management";
import { SmartComponentProps } from "../../../interfaces/smartComponentProps";
import styles from './pagePaginationStyle.scss';

const TEXT_TOTAL_ITEMS: string = 'Всего элементов: ';

function getPagesList(maxPages: number): number[] {
    const result: number[] = [];

    for (let i = 1; i <= maxPages; ++i) {
        result.push(i);
    }

    return result;
}


function PagePagination(props: SmartComponentProps<StoreDisplayedData<any>>) {

    if (props.store.dataStatus === 'empty') {
        return null;
    }

    const availableNumberItemsOnPage: number[] = props.store.availableNumberItemsOnPage;
    const numberItemsPerPage: number = props.store.numberItemsPerPage;
    const maxPages = props.store.maxPages;
    const currentPage = props.store.currentPage;
    const totalItems = props.store.totalItems;

    const pagesList: number[] = getPagesList(maxPages);

    return (
        <div className={styles.componentContainer}>
            <div className={styles.paginationLine}>
                <div className={styles.leftContainer}>
                    <select
                        className={styles.select}
                        value={numberItemsPerPage}
                        title={'Элементов на странице'}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            const valueNumber: number = convertToNumber({
                                defaultValue: 0,
                                valueForConvert: value
                            });
                            props.store.setOptions({ numberItemsPerPage: valueNumber });
                        }}
                    >
                        {
                            availableNumberItemsOnPage.map((item, index) =>
                                <option
                                    value={item}
                                    key={index}
                                >
                                    {item}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className={styles.rightContainer}>
                    <button
                        title={'Предыдущая страница'}
                        onClick={props.store.eventShowPrevPage}
                        className={`${styles.arrowNexPrevious} ${styles.arrowPrevious}`}
                    />

                    <select
                        title={'Текущая страница'}
                        className={styles.select}
                        value={currentPage}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            const valueNumber: number = convertToNumber({
                                defaultValue: 0,
                                valueForConvert: value
                            });
                            props.store.setOptions({ currentPage: valueNumber });
                        }}
                    >
                        {
                            pagesList.map((pageNumber, index) =>
                                <option
                                    value={pageNumber}
                                    key={index}
                                >
                                    {pageNumber}
                                </option>
                            )
                        }
                    </select>

                    <button
                        title={'Следующая страница'}
                        className={`${styles.arrowNexPrevious} ${styles.arrowNext}`}
                        onClick={props.store.eventShowNextPage}
                    />
                </div>
            </div>

            <div className={styles.lineHelpInfo}>
                <div className={styles.totalItemsContainer}>
                    <span>{TEXT_TOTAL_ITEMS}</span>
                    <span className={styles.itemsCount}>
                        {totalItems}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default observer(PagePagination);
