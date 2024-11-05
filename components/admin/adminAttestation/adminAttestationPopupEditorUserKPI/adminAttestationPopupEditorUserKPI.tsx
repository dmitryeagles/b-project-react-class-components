import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    ATTESTATION_SCHEME_CALCULATING_VALUE_OF_INDICATOR
} from "../../../../staticData/attestationSchemeCalculatingValueOfIndicator";
import {
    StoreAdminAttestationEditorUserKPI
} from "../../../../stores/admin/attestation/adminAttestationStoresEditors/storeAdminAttestationEditorUserKPI";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {DropdownMultiSelect} from "../../../common/dropdownMultiSelect";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import {StandardPanel} from "../../../common/standardPanel";
import AdminLabelWithContainerTwoLine from "../../adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from "./adminAttestationPopupEditorUserKPIStyle.scss";

const EditorDropdownSelect = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorTextDropdown}>
                        {props.store.errorText}
                    </div> : null
            }
        </div>
    );
});


interface TestLevelProps {
    readonly testName: string;
    readonly storeSelectLevel: StoreComponentDropdownSelect;
}

const TestLevel = React.memo((props: TestLevelProps) => {
    return (
        <StandardPanel>
            <div className={styles.testLevelTestName}>{props.testName}</div>
            <AdminLabelWithContainerTwoLine label={'Уровень:'}>
                <EditorDropdownSelect store={props.storeSelectLevel}/>
            </AdminLabelWithContainerTwoLine>
        </StandardPanel>
    );
});

const DropdownMultiSelectTests = observer((props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) => {
    if (!props.store.isCheckLvlByTest) {
        return (
            <div>
                <DropdownMultiSelect
                    eventChange={props.store.storeEditorTests.eventChangeValues}
                    isClearable={true}
                    isCloseMenuOnSelect={true}
                    placeholder={props.store.storeEditorTests.placeholder}
                    selectedValues={props.store.storeEditorTests.selectedValues}
                    optionsList={props.store.storeEditorTests.optionsList}
                />
                {
                    props.store.storeEditorTests.errorText ?
                        <div className={styles.errorTextDropdown}>
                            {props.store.storeEditorTests.errorText}
                        </div> : null
                }
            </div>
        );
    }

    const detailTests: JSX.Element[] = [];

    for (let key in props.store.editorTestsLevels) {
        detailTests.push(
            <TestLevel
                key={key}
                storeSelectLevel={props.store.editorTestsLevels[key].storeSelectLevel}
                testName={props.store.editorTestsLevels[key].testName}
            />
        );
    }

    return (
        <div>
            <div>
                <DropdownMultiSelect
                    eventChange={props.store.storeEditorTests.eventChangeValues}
                    isClearable={true}
                    isCloseMenuOnSelect={true}
                    placeholder={props.store.storeEditorTests.placeholder}
                    selectedValues={props.store.storeEditorTests.selectedValues}
                    optionsList={props.store.storeEditorTests.optionsList}
                />
                {
                    props.store.storeEditorTests.errorText ?
                        <div className={styles.errorTextDropdown}>
                            {props.store.storeEditorTests.errorText}
                        </div> : null
                }
            </div>

            <div className={styles.testLevelContainer}>
                {detailTests}
            </div>
        </div>
    );
});

const EditorMaxCountErrors = observer((props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) => {
    if (props.store.storeEditorSchemeCalculating.selectedValue?.value !== ATTESTATION_SCHEME_CALCULATING_VALUE_OF_INDICATOR.calculationPercentageByNumberOfErrors.value) {
        return null;
    }

    return (
        <AdminLabelWithContainerTwoLine label={'Максимально возможное количество ошибок:'}>
            <InputNumeric
                eventChange={props.store.storeEditorMaxCountErrors.eventChangeValue}
                errorText={props.store.storeEditorMaxCountErrors.errorText}
                max={props.store.storeEditorMaxCountErrors.maxValue}
                min={props.store.storeEditorMaxCountErrors.minValue}
                value={props.store.storeEditorMaxCountErrors.value}
            />
        </AdminLabelWithContainerTwoLine>
    );
});

const EditorScores = observer((props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) => {

    if (props.store.storeEditorTests.selectedValues.length) {
        return null;
    }

    return (
        <AdminLabelWithContainerTwoLine label={'Вес:'}>
            <InputNumeric
                eventChange={props.store.storeScore.eventChangeValue}
                errorText={props.store.storeScore.errorText}
                max={props.store.storeScore.maxValue}
                min={props.store.storeScore.minValue}
                value={props.store.storeScore.value}
            />
        </AdminLabelWithContainerTwoLine>
    );
});

const PassingScore = observer((props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) => {

    if (!props.store.storeEditorTests.selectedValues.length || props.store.storeEditorSchemeCalculating.selectedValue?.value === 2) {
        return null;
    }

    return (
        <AdminLabelWithContainerTwoLine label={'Проходной балл для теста:'}>
            <InputNumeric
                eventChange={props.store.storeEditorPointsForAttestation.eventChangeValue}
                errorText={props.store.storeEditorPointsForAttestation.errorText}
                max={props.store.storeEditorPointsForAttestation.maxValue}
                min={props.store.storeEditorPointsForAttestation.minValue}
                value={props.store.storeEditorPointsForAttestation.value}
            />
        </AdminLabelWithContainerTwoLine>
    );
});

const EditorSchemeCalculating = observer((props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) => {

    if (!props.store.storeEditorTests.selectedValues.length) {
        return null;
    }

    return (
        <AdminLabelWithContainerTwoLine label={'Схема расчета значения показателя:'}>
            <EditorDropdownSelect store={props.store.storeEditorSchemeCalculating}/>
        </AdminLabelWithContainerTwoLine>
    );
});

function AdminAttestationPopupEditorUserKPI(props: SmartComponentProps<StoreAdminAttestationEditorUserKPI>) {

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCancelEdit}
            eventSaveEditData={props.store.eventSaveEditedData}
            popupTitle={props.store.isNewItem ? 'Добавить KPI сотрудника' : 'Изменить KPI сотрудника'}
            btnSaveText={props.store.isNewItem ? 'Добавить' : 'Изменить'}
        >
            <AdminLabelWithContainerTwoLine label={'KPI сотрудника:'}>
                <EditorDropdownSelect store={props.store.storeEditorUserKPI}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Список тестов:'}>
                <DropdownMultiSelectTests store={props.store}/>
            </AdminLabelWithContainerTwoLine>


            <EditorSchemeCalculating store={props.store}/>


            <EditorMaxCountErrors store={props.store}/>

            <EditorScores store={props.store}/>
            <PassingScore store={props.store}/>
        </AdminPopupEditor>
    );
}

export default React.memo(AdminAttestationPopupEditorUserKPI);
