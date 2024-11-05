import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentUsers} from "../../../../stores/admin/users/storeAdminPageContentUsers";
import {StoreComponentDropdownMultiSelect} from "../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputDate} from "../../../../stores/common/storeComponentInputDate";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {DropdownMultiSelect} from "../../../common/dropdownMultiSelect";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputDate} from "../../../common/inputDate";
import {InputText} from "../../../common/inputText";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminUsersEditorStyle.scss';
import { StandardCheckbox } from "../../../common/standardCheckbox";
import { StoreComponentStandardCheckbox } from "../../../../stores/common/storeComponentStandardCheckbox";

const InputEditorText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

const InputEditorDate = observer((props: SmartComponentProps<StoreComponentInputDate>) => {
    return (
        <InputDate
            isClearable={props.store.isClearable}
            className={styles.inputText}
            selectedDate={props.store.value}
            eventChangeDate={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

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

const DropdownMultiSelectEditorSystemRoles = observer((props: SmartComponentProps<StoreComponentDropdownMultiSelect<string>>) => {
    return (
        <>
            <DropdownMultiSelect
                isClearable={true}
                eventChange={props.store.eventChangeValues}
                placeholder={props.store.placeholder}
                selectedValues={props.store.selectedValues}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});


const EditorIsAllFactoriesHeadsList = observer((props: SmartComponentProps<StoreComponentStandardCheckbox>) => {
    return (
        <div className={styles.editorIsAllHeadsListContainer}>
            <StandardCheckbox
                publicText={'Показать руководителей всех заводов'}
                eventCheck={props.store.eventChangeValue}
                isCheck={props.store.isCheck}
            />
        </div>
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

function AdminUsersEditor(props: SmartComponentProps<StoreAdminPageContentUsers>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <CategoryContainer categoryTitle={'Личные данные'}>
                <AdminLabelWithContainerTwoLine label={'Фамилия:'} isRequired>
                    <InputEditorText store={props.store.storeEditData.storeEditSurname}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Имя:'} isRequired>
                    <InputEditorText store={props.store.storeEditData.storeEditName}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Отчество:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditPatronymic}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Страна:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditUserCountry}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Город:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditUserCity}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Телефон:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditUserPhoneNumber}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Дата рождения:'}>
                    <InputEditorDate store={props.store.storeEditData.storeEditBirthDate}/>
                </AdminLabelWithContainerTwoLine>
            </CategoryContainer>

            <CategoryContainer categoryTitle={'Рабочая информация'}>
                <AdminLabelWithContainerTwoLine label={'Завод:'} isRequired>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditFactory}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Должность:'} isRequired>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditPosition}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Подразделение:'} isRequired>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditUnit}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Руководитель:'}>
                    <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditHead} />
                    <EditorIsAllFactoriesHeadsList store={props.store.storeEditData.storeIsShowAllHead} />
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Дата приема на работу:'}>
                    <InputEditorDate store={props.store.storeEditData.storeEditEmploymentDate}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Табельный номер:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditUserIdentificator}/>
                </AdminLabelWithContainerTwoLine>
            </CategoryContainer>

            <CategoryContainer categoryTitle={'Система'}>
                <AdminLabelWithContainerTwoLine label={'Логин:'} isRequired>
                    <InputEditorText store={props.store.storeEditData.storeEditAuthLogin}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'E-mail:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditEmail}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Сброс пароля:'}>
                    <DropdownSelectEditorValueNumber
                        store={props.store.storeEditData.storeEditNeedChangePassword}/>
                </AdminLabelWithContainerTwoLine>

                <AdminLabelWithContainerTwoLine label={'Роли в системе:'} isRequired>
                    <DropdownMultiSelectEditorSystemRoles store={props.store.storeEditData.storeEditSystemRoles}/>
                </AdminLabelWithContainerTwoLine>
                {
                    props.store.storeEditData.storeEditUserPassword ?
                        <AdminLabelWithContainerTwoLine label={'Пароль:'} isRequired>
                            <InputEditorText store={props.store.storeEditData.storeEditUserPassword}/>
                        </AdminLabelWithContainerTwoLine> : null
                }
            </CategoryContainer>
        </AdminPopupEditor>
    );
}

export default observer(AdminUsersEditor);
