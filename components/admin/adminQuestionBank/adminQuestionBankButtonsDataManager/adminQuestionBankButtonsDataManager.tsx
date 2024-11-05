import React from "react";
import FileTextIco from "../../../../img/svg_component/fileText.svg";
import PlusIco from "../../../../img/svg_component/plus.svg";
import {StandardButton} from "../../../common/standardButton";
import styles from "./adminQuestionBankButtonsDataManagerStyle.scss";

interface AdminQuestionBankButtonsDataManagerProps {
    readonly eventStartAddNewItem: () => void;
    readonly eventStartAddQuestionsFromFile:()=> void;
}

function AdminQuestionBankButtonsDataManager(props: AdminQuestionBankButtonsDataManagerProps) {
    return (
        <div className={styles.componentContainer}>
            <StandardButton
                text={'Добавить вопрос'}
                type={'primary'}
                iconLeft={<PlusIco/>}
                eventClick={props.eventStartAddNewItem}
            />
            <StandardButton
                text={'Загрузить вопросы из файла'}
                iconLeft={<FileTextIco/>}
                type={'primary'}
                eventClick={props.eventStartAddQuestionsFromFile}
            />
        </div>
    );
}

export default React.memo(AdminQuestionBankButtonsDataManager);
