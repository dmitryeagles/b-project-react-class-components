import React from "react";
import {TestQuestionEditModel} from "../../../../interfaces/api/testQuestionEditModel";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import ExamTestQuestionContentReadMode from "./examTestQuestionContentReadMode";
import styles from "./testQuestionsListReadModeStyle.scss";


interface TestQuestionReadModeProps extends AdminActionButtonsProps {
    readonly question: TestQuestionEditModel;
}

function TestQuestionReadMode(props: TestQuestionReadModeProps) {
    return (
        <AdminListItemContainer
            className={styles.itemQuestion}
            itemId={props.question.uuid}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
            buttonsText={props.buttonsText}
        >
            <ExamTestQuestionContentReadMode question={props.question}/>
        </AdminListItemContainer>
    );
}

export default React.memo(TestQuestionReadMode);
