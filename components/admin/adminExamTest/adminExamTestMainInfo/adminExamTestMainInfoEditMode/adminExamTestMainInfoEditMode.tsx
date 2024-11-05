import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreEditorExamTestMainInfo} from "../../../../../stores/admin/testList/editors/storeEditorExamTestMainInfo";
import {StoreComponentDropdownMultiSelect} from "../../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentDropdownSelect} from "../../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../../stores/common/storeComponentInputNumber";
import {StoreComponentInputText} from "../../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../../common/checkboxButton";
import {DropdownMultiSelect} from "../../../../common/dropdownMultiSelect";
import {DropdownSelect} from "../../../../common/dropdownSelect";
import {InputNumeric} from "../../../../common/inputNumeric";
import {InputText} from "../../../../common/inputText";
import {StandardButton} from "../../../../common/standardButton";
import {StandardPanel} from "../../../../common/standardPanel";
import {AdminLabelWithContainerTwoLine} from "../../../adminLabelWithContainerTwoLine";
import styles from './adminExamTestMainInfoEditModeStyle.scss';

const EditorTestName = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputEditorTextName}
            value={props.store.value}
            errorText={props.store.errorText}
            eventChange={props.store.eventChangeValue}
        />
    );
});

const EditorJobTitle = observer((props: SmartComponentProps<StoreComponentDropdownMultiSelect>) => {
    return (
        <div>
            <CheckboxButton
                isChecked={props.store.isSelectedAll}
                eventCheck={props.store.eventToggleSelectAll}
                publicText={'Тест является общим, для всех текущих доступных должностей'}
            />
            {
                !props.store.isSelectedAll ?
                    <div className={styles.positionEditorWrapper}>
                        <DropdownMultiSelect
                            eventChange={props.store.eventChangeValues}
                            selectedValues={props.store.selectedValues}
                            optionsList={props.store.optionsList}
                            placeholder={props.store.placeholder}
                            isClearable={true}
                        />
                        {
                            props.store.errorText ?
                                <div className={styles.errorText}>
                                    {props.store.errorText}
                                </div>
                                : null
                        }
                    </div> : null
            }
        </div>
    );
});

const EditorFactory = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
                placeholder={props.store.placeholder}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorText}>
                        {props.store.errorText}
                    </div>
                    : null
            }
        </div>
    );
});

const EditorInputNumeric = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            eventChange={props.store.eventChangeValue}
            value={props.store.value}
            min={props.store.minValue}
            max={props.store.maxValue}
            errorText={props.store.errorText}
        />
    );
});

export function AdminExamTestMainInfoEditMode(props: SmartComponentProps<StoreEditorExamTestMainInfo>) {
    return (
        <StandardPanel>
            <AdminLabelWithContainerTwoLine
                label={'Название теста:'}
            >
                <EditorTestName store={props.store.storeEditorExamTestPublicName}/>
            </AdminLabelWithContainerTwoLine>
            {
                props.store.isNewExamTest ?
                    <AdminLabelWithContainerTwoLine
                        label={'Завод:'}
                    >
                        <EditorFactory store={props.store.storeEditorFactory}/>
                    </AdminLabelWithContainerTwoLine> : null
            }
            <AdminLabelWithContainerTwoLine
                label={'Список должностей:'}
                helpText={'Список должностей выбранного завода. Внимание! При смене завода данное поле будет сброшено'}
            >
                <EditorJobTitle store={props.store.storeEditorPositions}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Максимальное количество попыток:'}
            >
                <EditorInputNumeric store={props.store.storeEditorAttemptCount}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Время прохождения теста, секунды:'}
                helpText={'Если тест не должен быть ограничен по времени, установите значение 0'}
            >
                <EditorInputNumeric store={props.store.storeEditorTestDurationSeconds}/>
            </AdminLabelWithContainerTwoLine>

            <div className={styles.buttonsContainer}>
                {
                    !props.store.isNewExamTest ?
                        <StandardButton
                            text={'Отмена'}
                            type={'cancel'}
                            eventClick={props.store.eventCancelEdit}
                        /> : null
                }
                <StandardButton
                    text={'Сохранить'}
                    type={'primary'}
                    eventClick={props.store.eventSaveEditedData}
                />
            </div>
        </StandardPanel>
    );
}

export default React.memo(AdminExamTestMainInfoEditMode);
