import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentEditExamTest
} from "../../../../../stores/admin/testList/storeAdminPageContentEditExamTest";
import {DropdownSelectItem} from "../../../../common/dropdownSelect/dropdownSelect";
import {StandardButton} from "../../../../common/standardButton";
import {StandardPanel} from "../../../../common/standardPanel";
import {StandardTagItem} from "../../../../common/standardTagItem";
import {AdminLabelWithContainerLine} from "../../../adminLabelWithContainerLine";
import styles from "./adminExamTestMainInfoReadModeStyle.scss";

//region Должности
interface PositionsItemsListProps {
    readonly positionsList: DropdownSelectItem[];
}

const PositionsItemsList = React.memo((props: PositionsItemsListProps) => {
    if (!props.positionsList.length) {
        return (<span>{'Список должностей отсутствует'}</span>);
    }

    return (
        <>
            {props.positionsList.map((item) =>
                <StandardTagItem
                    key={item.value}
                    publicNameMaxLength={30}
                    tagPublicName={item.label}
                />
            )}
        </>
    );
});
//endregion


function AdminExamTestMainInfoReadMode (props: SmartComponentProps<StoreAdminPageContentEditExamTest>) {
    const examTesMainInfo = props.store.storeExamTestMainInfoReadMode.examTesMainInfo;

    return (
        <StandardPanel>
            {
                examTesMainInfo.examTestPublicName ? <div className={styles.testTitle}>{examTesMainInfo.examTestPublicName}</div> : null
            }

            <AdminLabelWithContainerLine label={'Дата обновления:'}>
                {dateFormatForView({
                    date: examTesMainInfo.updatedDate,
                    format: 'DD.MM.YYYY',
                    defaultValue: '-'
                })}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Количество попыток:'}>
                {examTesMainInfo.attemptCount}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Время выполнения, с:'}>
                {examTesMainInfo.examTestDurationSeconds}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {examTesMainInfo.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Список должностей:'}>
                <PositionsItemsList positionsList={examTesMainInfo.positionsList}/>
            </AdminLabelWithContainerLine>

            <div className={styles.buttonsContainer}>

                <StandardButton
                    text={'Изменить'}
                    eventClick={props.store.eventStartEditExamTestMainInfo}
                />
            </div>
        </StandardPanel>
    );
}

export default React.memo(AdminExamTestMainInfoReadMode);
