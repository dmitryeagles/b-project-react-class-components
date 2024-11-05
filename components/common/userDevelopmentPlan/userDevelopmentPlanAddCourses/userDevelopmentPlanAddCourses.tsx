import { observer } from "mobx-react";
import React from "react";
import { SmartComponentProps } from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentUserDevelopmentPlan
} from "../../../../stores/common/pageUserDevelopmentPlan/storeCommonPageContentUserDevelopmentPlan";
import { StoreComponentInputText } from "../../../../stores/common/storeComponentInputText";
import { StudentMyProjectPopupEditor } from "../../../student/studentMyProject/studentMyProjectPopupEditor";
import { InputText } from "../../inputText";
import { LabelWithContainerOnTwoLine } from "../../labelWithContainerOnTwoLine";
import styles from "./userDevelopmentPlanAddCoursesStyle.scss";
import LabelWithContainerOnOneLine from "../../labelWithContainerOnOneLine/labelWithContainerOnOneLine";

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

function UserDevelopmentPlanAddCourses(props: SmartComponentProps<StoreCommonPageContentUserDevelopmentPlan>) {
    if (!props.store.storeEditData?.storeEditorDataStage) {
        return null;
    }
    if (props.store.storeEditData?.storeIsActive.status === true) {
        return (
            <StudentMyProjectPopupEditor
                className={styles.popupBodySize}
                eventCloseEditor={props.store.storeEditData?.storeEditorDataStage.storeEditor.eventCloseEditor}
                eventSaveEditData={props.store.storeEditData?.storeEditorDataStage.storeEditor.eventSaveEditData}
                popupTitle={props.store.storeEditData?.storeEditorDataStage.storeEditor.textEditorTitle}
                btnSaveText={props.store.storeEditData?.storeEditorDataStage.storeEditor.textSaveBtn}
            >
                { !props.store.storeEditData?.storeEditorDataStage.storeEditor.isLocalCourse ?
                    <>
                        <LabelWithContainerOnTwoLine label={'Способ:'}>
                            <InputEditorText store={props.store.storeEditData?.storeEditorDataStage.storeEditor.storeEditCoursesMethod} />
                        </LabelWithContainerOnTwoLine>
                        <LabelWithContainerOnTwoLine label={'Наименование:'}>
                            <InputEditorText store={props.store.storeEditData?.storeEditorDataStage.storeEditor.storeEditCoursesName} />
                        </LabelWithContainerOnTwoLine>
                    </> :
                    <>
                        <LabelWithContainerOnOneLine
                            label={'Способ:'}
                        >
                            {props.store.storeEditData?.storeEditorDataStage.storeEditor.storeEditCoursesMethod.value}
                        </LabelWithContainerOnOneLine>

                        <LabelWithContainerOnOneLine
                            label={'Наименование:'}
                        >
                            {props.store.storeEditData?.storeEditorDataStage.storeEditor.storeEditCoursesName.value}
                        </LabelWithContainerOnOneLine>
                    </>
                }
                <LabelWithContainerOnTwoLine label={'Комментарий:'}>
                    <InputEditorText store={props.store.storeEditData?.storeEditorDataStage.storeEditor.storeEditCoursesComment} />
                </LabelWithContainerOnTwoLine>
            </StudentMyProjectPopupEditor>
        )
    } else { return null }
}


export default observer(UserDevelopmentPlanAddCourses);
