import {observer} from "mobx-react";

import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentEditExamTest
} from "../../../../../stores/admin/testList/storeAdminPageContentEditExamTest";
import {StoreComponentDropdownSelect} from "../../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../../stores/common/storeComponentInputNumber";
import {DropdownSelect} from "../../../../common/dropdownSelect";
import {InputNumeric} from "../../../../common/inputNumeric";
import {AdminLabelWithContainerTwoLine} from "../../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../adminPopupEditor";
import styles from './adminPopupEditorExamTestQuestionsGroupStyle.scss';

const EditorNumeric = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            max={props.store.maxValue}
            min={props.store.minValue}
            value={props.store.value}
        />
    );
});

const EditorQuestionsGroup = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                optionsList={props.store.optionsList}
                selectedValue={props.store.selectedValue}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorText}>{props.store.errorText}</div> :
                    null
            }
        </div>
    );
});

function AdminPopupEditorExamTestQuestionsGroup(props: SmartComponentProps<StoreAdminPageContentEditExamTest>) {

    if (!props.store.storePopupEditorQuestionsGroup) {
        return null;
    }

    return (
        <AdminPopupEditor
            eventCloseEditor={props.store.storePopupEditorQuestionsGroup.eventCloseEditor}
            eventSaveEditData={props.store.storePopupEditorQuestionsGroup.eventSaveEditData}
            popupTitle={props.store.storePopupEditorQuestionsGroup.textEditorTitle}
            btnSaveText={props.store.storePopupEditorQuestionsGroup.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine
                label={'Группа вопросов:'}
            >
                <EditorQuestionsGroup store={props.store.storePopupEditorQuestionsGroup.storeEditorQuestionGroup}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Количество вопросов:'}
                helpText={'Целевое количество вопросов, в случае если в группе вопросов меньше указанного, будет использоваться доступное количество вопросов группы'}
            >
                <EditorNumeric store={props.store.storePopupEditorQuestionsGroup.storeEditorQuestionCount}/>
            </AdminLabelWithContainerTwoLine>

        </AdminPopupEditor>
    );
}

export default observer(AdminPopupEditorExamTestQuestionsGroup);
