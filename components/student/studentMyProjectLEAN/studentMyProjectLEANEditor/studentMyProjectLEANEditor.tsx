import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonEditSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonEditSendProjectLEAN";
import {
    StoreCommonPageContentSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonPageContentSendProjectLEAN";
import {StoreComponentDropdownMultiSelect} from "../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {DropdownMultiSelect} from "../../../common/dropdownMultiSelect";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputText} from "../../../common/inputText";
import {LabelWithContainerOnTwoLine} from "../../../common/labelWithContainerOnTwoLine";
import StudentMyProjectPopupEditor from "../studentMyProjectLEANPopupEditor/studentMyProjectLEANPopupEditor";
import {StudentUploadFilePreviewImage} from "../studentMyProjectLEANUploadFilePreviewImage";
import styles from "./studentMyProjectLEANEditorStyle.scss";

const InputEditorText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            placeholder={props.store.placeholder}
        />
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
                maxLimit={4}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
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

const UploadFilePreviewImageBefore = observer((props: SmartComponentProps<StoreCommonEditSendProjectLEAN>) => {
    return (
        <StudentUploadFilePreviewImage
            previewImagePath={props.store.storeEditImageBefore.previewImagePath}
            classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
            isSelectedPreviewImageFile={!!props.store.storeEditImageBefore.uploadFileImage}
            errorText={props.store.storeEditImageBefore.errorUploadFileImage}
            eventSelectedPreviewImageFile={props.store.storeEditImageBefore.eventSelectedPreviewImageFile}
            eventResetSelectedPreviewImageFile={props.store.storeEditImageBefore.eventResetSelectedPreviewImageFile}
        />
    );
});


function StudentMyProjectLEANEditor(props: SmartComponentProps<StoreCommonPageContentSendProjectLEAN>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <StudentMyProjectPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <CategoryContainer categoryTitle={'Проект:'}>
                <LabelWithContainerOnTwoLine label={'Название проекта:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditName} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Управляющий менеджер:"}>
                    <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditIspectorManagers} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Участок / оборудование:"}>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditEquipments} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Участники:"}>
                    <DropdownMultiSelectEditorSystemRoles store={props.store.storeEditData.storeEditParticipants} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"KPI воздействия:"}>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditKPIProjects} />
                </LabelWithContainerOnTwoLine>

                <LabelWithContainerOnTwoLine label={'Проблема:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditProblem} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={'Описание идеи:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditDescriptionIdea} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={'Цель проекта:'}>
                    <InputEditorText store={props.store.storeEditData.storeEditTarget} />
                </LabelWithContainerOnTwoLine>
                <div className={styles.imgesContainer}>
                    <LabelWithContainerOnTwoLine label={"Фото до:"}>
                        <div className={styles.itemImgContainer}>
                            <UploadFilePreviewImageBefore store={props.store.storeEditData} />
                        </div>
                    </LabelWithContainerOnTwoLine>
                </div>
            </CategoryContainer>
        </StudentMyProjectPopupEditor>
    );
}

export default observer(StudentMyProjectLEANEditor);
