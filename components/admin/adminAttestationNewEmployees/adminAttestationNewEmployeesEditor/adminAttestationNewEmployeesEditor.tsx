import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentAttestationNewEmployee
} from "../../../../stores/admin/attestationNewEmployee/storeAdminPageContentAttestationNewEmployee";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import {LabelWithContainerOnTwoLine} from "../../../common/labelWithContainerOnTwoLine";
import AdminAttestationNewEmployeesPopupEditor
    from "../adminAttestationNewEmployeesPopupEditor/adminAttestationNewEmployeesPopupEditor";
import styles from './adminAttestationNewEmployeesEditorStyle.scss';

const DropdownSelectEditorValueNumber = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});

const DropdownSelectEditorValueString = observer((props: SmartComponentProps<StoreComponentDropdownSelect<string>>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});

const EditorPassingScore = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            errorText={props.store.errorText}
            value={props.store.value}
            min={props.store.minValue}
            max={props.store.maxValue}
            eventChange={props.store.eventChangeValue}
        />
    );
});

interface CategoryContainerProps {
    readonly categoryTitle: string;
    readonly children: React.ReactNode;
}

const CategoryContainer = React.memo((props: CategoryContainerProps) => {
    return (
        <div>
            <div className={styles.categorySeparator}>
                {props.categoryTitle}
            </div>
            <div className={styles.categoryContentContainer}>
                {props.children}
            </div>
        </div>
    );
})

function AdminAttestationNewEmployeesEditor(props: SmartComponentProps<StoreAdminPageContentAttestationNewEmployee>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <AdminAttestationNewEmployeesPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <CategoryContainer categoryTitle={''}>
                <LabelWithContainerOnTwoLine label={'Выбрать завод'} isRequired>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditFactory}/>
                </LabelWithContainerOnTwoLine>

                <LabelWithContainerOnTwoLine label={'Выбрать сотрудника'} isRequired>
                    <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditUser}/>
                </LabelWithContainerOnTwoLine>

                <LabelWithContainerOnTwoLine label={'Выбрать тест'} isRequired>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditTest}/>
                </LabelWithContainerOnTwoLine>

                <LabelWithContainerOnTwoLine
                    label={'Проходной балл'}
                    helpText={'Минимальное значение: 1'}
                    isRequired
                >
                    <EditorPassingScore store={props.store.storeEditData.storeEditPassingScore}/>
                </LabelWithContainerOnTwoLine>
            </CategoryContainer>
        </AdminAttestationNewEmployeesPopupEditor>
    );
}

export default observer(AdminAttestationNewEmployeesEditor);
