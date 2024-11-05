import {observer} from "mobx-react";
import React from "react";
import CancelIcoSVG from '../../../../img/svg_component/cancel.svg';
import CheckDoubleIcoSVG from '../../../../img/svg_component/checkDouble.svg';
import {AdminFeedbackNMTemplate} from "../../../../interfaces/api/adminFeedbackNM";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditTemplateNM} from "../../../../stores/admin/templateNM/storeAdminEditTemplateNM";
import {StoreAdminPageContentTemplateNM} from "../../../../stores/admin/templateNM/storeAdminPageContentTemplateNM";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputText} from "../../../common/inputText";
import {StandardButton} from "../../../common/standardButton";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminTemplateNMEditorStyle.scss';

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

const DropdownSelectEditorFactory = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
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

interface TemplateItemProps {
    readonly isSelected: boolean;
    readonly label: string;
    readonly fieldName: string;
    readonly eventChangeTemplate: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const TemplateItem = React.memo((props: TemplateItemProps) => {
    return (
        <div
            className={props.isSelected ? `${styles.templateItemContainer} ${styles.templateItemContainerActive}` : styles.templateItemContainer}>
            <div className={styles.templateItemContent}>
                <span
                    onClick={props.eventChangeTemplate}
                    data-field={props.fieldName}
                    className={props.isSelected ?
                        `${styles.checkBoxActive} ${styles.checkBoxSelectedTemplateItem}` :
                        styles.checkBoxSelectedTemplateItem}
                />
                <span>{props.label}</span>
            </div>
        </div>
    );
});


const TemplateNM = observer((props: SmartComponentProps<StoreAdminEditTemplateNM>) => {

    const fieldsElementsList: JSX.Element[] = [];

    for (let key in props.store.templateForEdit) {
        if (!props.store.templateForEdit.hasOwnProperty(key)) {
            continue;
        }

        const fieldName = key as keyof AdminFeedbackNMTemplate;
        const currentItem = props.store.templateForEdit[fieldName];

        fieldsElementsList.push(
            <TemplateItem
                key={currentItem.uuid}
                label={currentItem.publicName}
                isSelected={currentItem.isSelected}
                fieldName={currentItem.fieldName}
                eventChangeTemplate={props.store.eventChangeTemplate}
            />
        );
    }

    return (
        <div className={styles.templateContainer}>
            {fieldsElementsList}
        </div>
    );
});


const PopupEditor = React.memo((props: SmartComponentProps<StoreAdminEditTemplateNM>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine label={'Название шаблона:'} isRequired>
                <InputEditorText store={props.store.storeEditorTemplateName}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Завод:'} isRequired>
                <DropdownSelectEditorFactory store={props.store.storeEditorFactory}/>
            </AdminLabelWithContainerTwoLine>

            <div className={styles.templateTitle}>{'Шаблон:'}</div>
            <div className={styles.buttonsContainer}>
                <StandardButton
                    text={'Выбрать все'}
                    eventClick={props.store.eventChangeTemplateSelectAll}
                    iconLeft={<CheckDoubleIcoSVG/>}
                />

                <StandardButton
                    eventClick={props.store.eventChangeTemplateResetSelect}
                    text={'Отменить все'}
                    type={'cancel'}
                    iconLeft={<CancelIcoSVG/>}
                />
            </div>
            <TemplateNM store={props.store}/>
        </AdminPopupEditor>
    );
})


function AdminTemplateNMEditor(props: SmartComponentProps<StoreAdminPageContentTemplateNM>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <PopupEditor store={props.store.storeEditData}/>
    );
}

export default observer(AdminTemplateNMEditor);
