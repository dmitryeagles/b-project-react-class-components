import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {KPIFeedbackType} from "../../../../../staticData/KPIFeedbackType";
import {KPITypeVariant} from "../../../../../staticData/KPIType";
import {StoreAdminEditKPIProgressive} from "../../../../../stores/admin/KPI/storeAdminEditKPIProgressive";
import {StoreAdminPageContentDictionaryKPI} from "../../../../../stores/admin/KPI/storeAdminPageContentDictionaryKPI";
import {StoreComponentDropdownMultiSelect} from "../../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentDropdownSelect} from "../../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../../stores/common/storeComponentInputNumber";
import {StoreComponentInputText} from "../../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../../common/checkboxButton";
import {DropdownMultiSelect} from "../../../../common/dropdownMultiSelect";
import {DropdownSelect} from "../../../../common/dropdownSelect";
import {InputNumeric} from "../../../../common/inputNumeric";
import {InputText} from "../../../../common/inputText";
import {AdminLabelWithContainerTwoLine} from "../../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../adminPopupEditor";
import styles from "./adminDictionaryKPIEditorStyle.scss";

const EditorInputText = observer((props: SmartComponentProps<StoreComponentInputText>) =>
    <InputText
        className={styles.inputTextWrapper}
        placeholder={props.store.placeholder}
        errorText={props.store.errorText}
        eventChange={props.store.eventChangeValue}
        value={props.store.value}
    />
);

const EditorInputNumber = observer((props: SmartComponentProps<StoreComponentInputNumber>) =>
    <InputNumeric
        errorText={props.store.errorText}
        eventChange={props.store.eventChangeValue}
        value={props.store.value}
        min={props.store.minValue}
        max={props.store.maxValue}
    />
);

const EditorDropDownSelect = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) =>
    <>
        <DropdownSelect
            selectedValue={props.store.selectedValue}
            placeholder={props.store.placeholder}
            eventChange={props.store.eventChangeValue}
            isSearchable={true}
            isClearable={props.store.isClearable}
            optionsList={props.store.optionsList}
        />
        {
            props.store.errorText ?
                <div className={styles.errorTextDropDownSelect}>
                    {props.store.errorText}
                </div> : null
        }
    </>
);

const EditorKpiType = observer((props: SmartComponentProps<StoreComponentDropdownSelect<KPITypeVariant>>) =>
    <>
        <DropdownSelect
            selectedValue={props.store.selectedValue}
            placeholder={props.store.placeholder}
            eventChange={props.store.eventChangeValue}
            isSearchable={true}
            isClearable={props.store.isClearable}
            optionsList={props.store.optionsList}
        />
        {
            props.store.errorText ?
                <div className={styles.errorTextDropDownSelect}>
                    {props.store.errorText}
                </div> : null
        }
    </>
);

const EditorKpiFeedbackType = observer((props: SmartComponentProps<StoreComponentDropdownSelect<KPIFeedbackType>>) =>
    <>
        <DropdownSelect
            selectedValue={props.store.selectedValue}
            placeholder={props.store.placeholder}
            eventChange={props.store.eventChangeValue}
            isSearchable={true}
            isClearable={props.store.isClearable}
            optionsList={props.store.optionsList}
        />
        {
            props.store.errorText ?
                <div className={styles.errorTextDropDownSelect}>
                    {props.store.errorText}
                </div> : null
        }
    </>
);

//region Редактор должностей
interface EditorPositionsProps {
    readonly storeEditorPositions: StoreComponentDropdownMultiSelect;
    readonly storeEditorKpiType: StoreComponentDropdownSelect<KPITypeVariant>;
}

const EditorPositions = observer((props: EditorPositionsProps) => {
        if (props.storeEditorKpiType.selectedValue?.value !== 'PositionKPI') {
            return null;
        }

        return (
            <AdminLabelWithContainerTwoLine
                label={'Должности:'}
                helpText={'Должность выбранного завода. Внимание! При смене завода и типа KPI данное поле будет сброшено'}
            >
                {
                    !props.storeEditorPositions.isSelectedAll ?
                        <div>
                            <DropdownMultiSelect
                                selectedValues={props.storeEditorPositions.selectedValues}
                                placeholder={props.storeEditorPositions.placeholder}
                                eventChange={props.storeEditorPositions.eventChangeValues}
                                optionsList={props.storeEditorPositions.optionsList}
                            />
                            {
                                props.storeEditorPositions.errorText ?
                                    <div className={styles.errorTextDropDownSelect}>
                                        {props.storeEditorPositions.errorText}
                                    </div> : null
                            }
                        </div> : <div
                            className={styles.selectedAllPositionsHelpText}>{'Обратите внимание! KPI будет доступен всем текущим должностям выбранного завода'}</div>
                }
                <CheckboxButton
                    className={styles.checkBoxSelectedAllPositions}
                    publicText={'KPI является общим, для всех текущих доступных должностей'}
                    eventCheck={props.storeEditorPositions.eventToggleSelectAll}
                    isChecked={props.storeEditorPositions.isSelectedAll}
                />
            </AdminLabelWithContainerTwoLine>
        );
    }
);

//endregion


interface EditorDynamicFormulaProps {
    readonly storeEditorProgressiveValue: StoreComponentInputNumber;
    readonly storeEditorProgressiveMinLimit: StoreComponentInputNumber;
    readonly storeEditorProgressiveMaxLimit: StoreComponentInputNumber
}

const EditorDynamicFormula = React.memo((props: EditorDynamicFormulaProps) => {
        return (
            <div>
                <div className={styles.dynamicFormulaEditorsContainer}>
                    <AdminLabelWithContainerTwoLine
                        label={'Шаг прогресивной шкалы:'}
                    >
                        <EditorInputNumber store={props.storeEditorProgressiveValue}/>
                    </AdminLabelWithContainerTwoLine>

                    <AdminLabelWithContainerTwoLine
                        label={'Вес шага прогрессивной шкалы:'}
                    >
                        <EditorInputNumber store={props.storeEditorProgressiveMinLimit}/>
                    </AdminLabelWithContainerTwoLine>

                    <AdminLabelWithContainerTwoLine
                        label={'Максимальное значение прогрессивной шкалы:'}
                    >
                        <EditorInputNumber store={props.storeEditorProgressiveMaxLimit}/>
                    </AdminLabelWithContainerTwoLine>
                </div>
            </div>
        );
    }
);


const CheckActiveDynamicFormula = observer((props: SmartComponentProps<StoreAdminEditKPIProgressive>) => {
        return (
            <div>
                <CheckboxButton
                    publicText={'Учитывать формулу'}
                    isChecked={!!props.store.editorsProgressiveValues}
                    eventCheck={props.store.eventToggleEditMode}
                />
                {
                    props.store.editorsProgressiveValues ?
                        <EditorDynamicFormula
                            storeEditorProgressiveMaxLimit={props.store.editorsProgressiveValues.storeEditorProgressiveMaxLimit}
                            storeEditorProgressiveMinLimit={props.store.editorsProgressiveValues.storeEditorProgressiveMinLimit}
                            storeEditorProgressiveValue={props.store.editorsProgressiveValues.storeEditorProgressiveValue}
                        /> : null
                }
            </div>
        );
    }
);

function AdminDictionaryKPIEditor(props: SmartComponentProps<StoreAdminPageContentDictionaryKPI>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <AdminPopupEditor
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine
                label={'Название KPI:'}
                isRequired
            >
                <EditorInputText store={props.store.storeEditData.storeEditorKPIPublicName}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Завод:'}
                helpText={'Внимание! При изменение завода, все связанные с выбранным заводом поля будут очищены'}
                isRequired
            >
                <EditorDropDownSelect store={props.store.storeEditData.storeEditorFactory}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Целевое значение:'}
                isRequired
            >
                <EditorInputNumber store={props.store.storeEditData.storeEditorTargetValue}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Вес по умолчанию:'}
                isRequired
            >
                <EditorInputNumber store={props.store.storeEditData.storeEditorDefaultScore}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Метод сравнения текущего значения с целевым:'}
                isRequired
            >
                <EditorDropDownSelect store={props.store.storeEditData.storeEditorTargetComparison}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Учитывать Sev/NM/Проект:'}>
                <EditorKpiFeedbackType store={props.store.storeEditData.storeEditorFeedbackType}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Динамическая формула:'}
            >
                <CheckActiveDynamicFormula store={props.store.storeEditData.storeEditorKPIProgressive}/>
            </AdminLabelWithContainerTwoLine>


            <AdminLabelWithContainerTwoLine
                label={'Тип KPI:'}
                isRequired
            >
                <EditorKpiType store={props.store.storeEditData.storeEditorKPIType}/>
            </AdminLabelWithContainerTwoLine>


            <EditorPositions
                storeEditorPositions={props.store.storeEditData.storeEditorPosition}
                storeEditorKpiType={props.store.storeEditData.storeEditorKPIType}
            />

            <AdminLabelWithContainerTwoLine
                isRequired
                helpText={'Модуль выбранного завода. Внимание! При смене завода данное поле будет сброшено'}
                label={'Категория KPI:'}
            >
                <EditorDropDownSelect store={props.store.storeEditData.storeEditorKpiCategory}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default observer(AdminDictionaryKPIEditor);
