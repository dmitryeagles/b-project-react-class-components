import React from "react";
import BasketIco from "../../../../../../img/svg_component/basket.svg";
import CancelIco from "../../../../../../img/svg_component/cancel.svg";
import EditIco from "../../../../../../img/svg_component/edit.svg";
import SaveIco from "../../../../../../img/svg_component/save.svg";
import {StandardButton} from "../../../../../common/standardButton";
import styles from './editorContainerAnswerOrQuestionStyle.scss';

const TEXT_EDIT: string = 'Редактировать';
const TEXT_DELETE: string = 'Удалить';
const TEXT_SAVE: string = 'Сохранить';
const TEXT_CANCEL: string = 'Отменить';

export interface AdminEditTestActionsButtonsReadModeProps {
    readonly itemId: string;
    readonly eventStartEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventDeleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ActionsButtonsEditModeProps {
    readonly eventSaveEdit: () => void;
    readonly eventCancelEdit: () => void;
}

export interface AdminEditTestActionButtonsProps extends AdminEditTestActionsButtonsReadModeProps {
    editModeEvents?: ActionsButtonsEditModeProps;
}

interface EditorContainerAnswerOrQuestionProps extends AdminEditTestActionButtonsProps {
    children: React.ReactNode;
}

function ActionsButtonsReadMode(props: AdminEditTestActionsButtonsReadModeProps) {
    return (
        <>
            {
                props.eventStartEdit ?
                    <StandardButton
                        iconLeft={<EditIco/>}
                        text={TEXT_EDIT}
                        eventClick={props.eventStartEdit}
                        type={'primary'}
                        className={styles.buttonAction}
                        dataAttributeId={props.itemId}
                    /> : null
            }
            {
                props.eventDeleteItem ?
                    <StandardButton
                        iconLeft={<BasketIco/>}
                        text={TEXT_DELETE}
                        eventClick={props.eventDeleteItem}
                        type={'cancel'}
                        className={styles.buttonAction}
                        dataAttributeId={props.itemId}
                    /> : null
            }
        </>
    );
}

function ActionsButtonsEditMode(props: ActionsButtonsEditModeProps) {
    return (
        <>
            <StandardButton
                iconLeft={<SaveIco/>}
                text={TEXT_SAVE}
                eventClick={props.eventSaveEdit}
                type={'primary'}
                className={styles.buttonAction}
            />

            <StandardButton
                iconLeft={<CancelIco/>}
                text={TEXT_CANCEL}
                eventClick={props.eventCancelEdit}
                type={'cancel'}
                className={styles.buttonAction}
            />
        </>
    );
}

/**
 * Контейнер для редактирования вопроса или ответа
 * @param props
 * @constructor
 */
function EditorContainerAnswerOrQuestion(props: EditorContainerAnswerOrQuestionProps) {
    return (
        <div className={styles.componentContainer}>
            <div>
                {props.children}
            </div>
            <div className={styles.buttonsActionsContainer}>
                {
                    props.editModeEvents ?
                        <ActionsButtonsEditMode
                            eventCancelEdit={props.editModeEvents.eventCancelEdit}
                            eventSaveEdit={props.editModeEvents.eventSaveEdit}
                        /> :
                        <ActionsButtonsReadMode
                            itemId={props.itemId}
                            eventStartEdit={props.eventStartEdit}
                            eventDeleteItem={props.eventDeleteItem}
                        />
                }
            </div>
        </div>
    );
}

export default React.memo(EditorContainerAnswerOrQuestion);
