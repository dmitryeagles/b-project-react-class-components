import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonEditProjectVote} from "../../../../stores/common/pageProjecVote/storeCommonEditProjectVote";
import {
    StoreCommonPageContentProjectVote
} from "../../../../stores/common/pageProjecVote/storeCommonPageContentProjectVote";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import AdminLabelWithContainerTwoLine
    from "../../../admin/adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";

import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import TextEditorMultiline from "../../../common/textEditorMultiline/textEditorMultiline";
import styles from './projectsForVotingEditorStyle.scss';


const InputEditorPublicName = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    )
});


interface VoteRadioButtonProps {
    readonly isChecked: boolean;
    readonly publicText: string;
    readonly eventCheck: () => void;
}

const VoteRadioButton = React.memo((props: VoteRadioButtonProps)=>{
    return (
        <div className={props.isChecked ? `${styles.selectedRadioButton} ${styles.radioButtonContainer}`:   styles.radioButtonContainer}>
             <span
                 onClick={props.eventCheck}
                 className={props.isChecked ? `${styles.radioButton} ${styles.radioButtonActive}` : styles.radioButton}
             />
            <span>{props.publicText}</span>
        </div>);
});


const VoteEditor= observer((props: SmartComponentProps<StoreCommonEditProjectVote>) => {
    return (
        <div>
            <VoteRadioButton
                publicText={'1'}
                isChecked={props.store.voteValue === 1}
                eventCheck={props.store.eventSetVoteValue1}
            />
            <VoteRadioButton
                publicText={'4'}
                isChecked={props.store.voteValue === 4}
                eventCheck={props.store.eventSetVoteValue4}
            />
            <VoteRadioButton
                publicText={'7'}
                isChecked={props.store.voteValue === 7}
                eventCheck={props.store.eventSetVoteValue7}
            />
            <VoteRadioButton
                publicText={'10'}
                isChecked={props.store.voteValue === 10}
                eventCheck={props.store.eventSetVoteValue10}
            />
        </div>
    );
});


function ProjectsForVotingEditor(props: SmartComponentProps<StoreCommonPageContentProjectVote>) {
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
            <AdminLabelWithContainerTwoLine label={'Комментарий:'}>
                <InputEditorPublicName store={props.store.storeEditData.storeEditorComment}/>
            </AdminLabelWithContainerTwoLine>

            <div className={styles.voteTitle}>
                {'Оценка проекту:'}
            </div>

            <VoteEditor store={props.store.storeEditData}/>
        </AdminPopupEditor>
    );
}

export default observer(ProjectsForVotingEditor);
