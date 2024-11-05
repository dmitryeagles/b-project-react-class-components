import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonEditSendProject} from "../../../../stores/common/pageSendProject/storeCommonEditSendProject";
import {
    StoreCommonPageContentSendProject
} from "../../../../stores/common/pageSendProject/storeCommonPageContentSendProject";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputText} from "../../../common/inputText";
import {LabelWithContainerOnTwoLine} from "../../../common/labelWithContainerOnTwoLine";
import StudentMyProjectPopupEditor from "../studentMyProjectPopupEditor/studentMyProjectPopupEditor";
import {StudentUploadFilePreviewImage} from "../studentUploadFilePreviewImage";
import styles from "./studentMyProjectEditorStyle.scss";

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

const UploadFilePreviewImageStandart = observer((props: SmartComponentProps<StoreCommonEditSendProject>) => {
    return (
        <StudentUploadFilePreviewImage
            previewImagePath={props.store.storeEditImageStandart.previewImagePath}
            classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
            isSelectedPreviewImageFile={!!props.store.storeEditImageStandart.uploadFileImage}
            errorText={props.store.storeEditImageStandart.errorUploadFileImage}
            eventSelectedPreviewImageFile={props.store.storeEditImageStandart.eventSelectedPreviewImageFile}
            eventResetSelectedPreviewImageFile={props.store.storeEditImageStandart.eventResetSelectedPreviewImageFile}
        />
    );
});

const UploadFilePreviewImageBefore = observer((props: SmartComponentProps<StoreCommonEditSendProject>) => {
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

const UploadFilePreviewImageAfter = observer((props: SmartComponentProps<StoreCommonEditSendProject>) => {
    return (
        <StudentUploadFilePreviewImage
            previewImagePath={props.store.storeEditImageAfter.previewImagePath}
            classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
            isSelectedPreviewImageFile={!!props.store.storeEditImageAfter.uploadFileImage}
            errorText={props.store.storeEditImageAfter.errorUploadFileImage}
            eventSelectedPreviewImageFile={props.store.storeEditImageAfter.eventSelectedPreviewImageFile}
            eventResetSelectedPreviewImageFile={props.store.storeEditImageAfter.eventResetSelectedPreviewImageFile}
        />
    );
});

function StudentMyProjectEditor(props: SmartComponentProps<StoreCommonPageContentSendProject>) {
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
                    <InputEditorText store={props.store.storeEditData.storeEditName}/>
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Управляющий менеджер:"}>
                    <DropdownSelectEditorValueString store={
                        props.store.storeEditData.storeEditInspectorManagers
                    } />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Участок / оборудование:"}>
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditEquipments} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine label={"Участники:"}>
                    <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditParticipants} />
                </LabelWithContainerOnTwoLine>
                <div className={styles.imgesContainer}>
                    <LabelWithContainerOnTwoLine label={"Фото до:"}>
                        <div className={styles.itemImgContainer}>
                            <UploadFilePreviewImageBefore store={props.store.storeEditData}/>
                        </div>
                    </LabelWithContainerOnTwoLine>
                    <LabelWithContainerOnTwoLine label={"Фото результата:"}>
                        <div className={styles.itemImgContainer}>
                            <UploadFilePreviewImageAfter store={props.store.storeEditData}/>
                        </div>
                    </LabelWithContainerOnTwoLine>
                    <LabelWithContainerOnTwoLine label={"Фото стандарта:"}>
                        <div className={styles.itemImgContainer}>
                            <UploadFilePreviewImageStandart store={props.store.storeEditData}/>
                        </div>
                    </LabelWithContainerOnTwoLine>
                </div>
            </CategoryContainer>
        </StudentMyProjectPopupEditor>
    );
}

export default observer(StudentMyProjectEditor);
