import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonPageContentSendProjectLEAN";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputDate} from "../../../../stores/common/storeComponentInputDate";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../common/checkboxButton";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputDate} from "../../../common/inputDate";
import {InputText} from "../../../common/inputText";
import {LabelWithContainerOnTwoLine} from "../../../common/labelWithContainerOnTwoLine";
import StudentMyProjectPopupEditor from "../studentMyProjectLEANPopupEditor/studentMyProjectLEANPopupEditor";
import {StudentUploadFilePreviewImage} from "../studentMyProjectLEANUploadFilePreviewImage";
import styles from "./studentResoursesEditorStyle.scss";

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

const InputEditorDate = observer((props: SmartComponentProps<StoreComponentInputDate>) => {
    return (
        <InputDate
            className={styles.inputText}
            selectedDate={props.store.value}
            eventChangeDate={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

const UploadFilePreviewImageResult = observer((props: SmartComponentProps<StoreCommonPageContentSendProjectLEAN>) => {
    if (!props.store.storeEditorDataStage) {
        return null;
    }
    if (props.store.storeEditorDataStage.editorType === 'editResult') {
        return (
            <StudentUploadFilePreviewImage
                previewImagePath={props.store.storeEditorDataStage.storeEditor.storeEditImageResult.previewImagePath}
                classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
                isSelectedPreviewImageFile={!!props.store.storeEditorDataStage.storeEditor.storeEditImageResult.uploadFileImage}
                errorText={props.store.storeEditorDataStage.storeEditor.storeEditImageResult.errorUploadFileImage}
                eventSelectedPreviewImageFile={props.store.storeEditorDataStage.storeEditor.storeEditImageResult.eventSelectedPreviewImageFile}
                eventResetSelectedPreviewImageFile={props.store.storeEditorDataStage.storeEditor.storeEditImageResult.eventResetSelectedPreviewImageFile}
            />
        );
    }
    return null;
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

const CheckByCompletionNotice = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Для реализации проекта требуются ресурсы или материалы'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);

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


function StudentResoursesEditor(props: SmartComponentProps<StoreCommonPageContentSendProjectLEAN>) {
    if (!props.store.storeEditorDataStage) {
        return null;
    }

    if (props.store.storeEditorDataStage.editorType === 'editResourse') {
        return (
            <StudentMyProjectPopupEditor
                className={styles.popupBodySize}
                eventCloseEditor={props.store.storeEditorDataStage.storeEditor.eventCloseEditor}
                eventSaveEditData={props.store.storeEditorDataStage.storeEditor.eventSaveEditData}
                popupTitle={props.store.storeEditorDataStage.storeEditor.textEditorTitle}
                btnSaveText={props.store.storeEditorDataStage.storeEditor.textSaveBtn}
            >
                <CategoryContainer categoryTitle={'Запросить ресурсы:'}>
                    <CheckByCompletionNotice store={props.store.storeEditorDataStage.storeEditor.storeIsNeedResource} />
                    { props.store.storeEditorDataStage.storeEditor.storeIsNeedResource.status === true ?
                    <>
                        <LabelWithContainerOnTwoLine label={"Утверждающий заявку на ресурсы:"}>
                            <DropdownSelectEditorValueString store={props.store.storeEditorDataStage.storeEditor.storeEditResourceManager} />
                        </LabelWithContainerOnTwoLine>
                        <LabelWithContainerOnTwoLine label={'Необходимые материалы и ресурсы:'}>
                            <InputEditorText store={props.store.storeEditorDataStage.storeEditor.storeEditResourse}/>
                        </LabelWithContainerOnTwoLine>
                    </> : null
                    }
                </CategoryContainer>
            </StudentMyProjectPopupEditor>
        );
    }
    if (props.store.storeEditorDataStage.editorType === 'editResult') {
        return (
            <StudentMyProjectPopupEditor
                className={styles.popupBodySize}
                eventCloseEditor={props.store.storeEditorDataStage.storeEditor.eventCloseEditor}
                eventSaveEditData={props.store.storeEditorDataStage.storeEditor.eventSaveEditData}
                popupTitle={props.store.storeEditorDataStage.storeEditor.textEditorTitle}
                btnSaveText={props.store.storeEditorDataStage.storeEditor.textSaveBtn}
            >
                <CategoryContainer categoryTitle={'Результаты:'}>
                    <LabelWithContainerOnTwoLine label={"Дата окончания:"}>
                        <InputEditorDate store={props.store.storeEditorDataStage.storeEditor.storeEditDateResult} />
                    </LabelWithContainerOnTwoLine>
                    <LabelWithContainerOnTwoLine label={'Результат внедрения проекта:'}>
                        <InputEditorText store={props.store.storeEditorDataStage.storeEditor.storeEditResult}/>
                    </LabelWithContainerOnTwoLine>
                    <LabelWithContainerOnTwoLine label={"Фото результата:"}>
                        <div className={styles.itemImgContainer}>
                            <UploadFilePreviewImageResult store={props.store} />
                        </div>
                    </LabelWithContainerOnTwoLine>
                </CategoryContainer>

            </StudentMyProjectPopupEditor>
        );
    }
    return null;
}
export default observer(StudentResoursesEditor);
