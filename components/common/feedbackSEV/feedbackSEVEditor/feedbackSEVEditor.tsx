import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {ITEMS_TEMPLATE_SEV} from "../../../../staticData/itemsTemplateSEV";
import {
    StoreCommonPageContentFeedbackSEV
} from "../../../../stores/common/pageFeedbackSEV/storeCommonPageContentFeedbackSEV";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputDate} from "../../../../stores/common/storeComponentInputDate";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {DropdownSelect} from "../../dropdownSelect";
import {InputDate} from "../../inputDate";
import {InputText} from "../../inputText";
import {LabelWithContainerOnTwoLine} from "../../labelWithContainerOnTwoLine";
import {TextEditorMultiline} from "../../textEditorMultiline";
import styles from './feedbackSEVEditorStyle.scss';

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

const InputNewEditorText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputNewText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            placeholder={props.store.placeholder}
        />
    );
});

const EditorReason = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            className={styles.inputReason}
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
    readonly categoryTitle?: string;
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
const Category = React.memo((props: CategoryContainerProps) => {
    return (
        <div className={styles.categoryContent}>
            {props.children}
        </div>
    );
})

function FeedbackSEVEditor(props: SmartComponentProps<StoreCommonPageContentFeedbackSEV>) {
    if (!props.store.storeEditData) {
        return null;
    }

    const currentSevTemplate = props.store.storeEditData.currentSevTemplate;

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <CategoryContainer categoryTitle={'Добавление обращения'}>
                {currentSevTemplate?.sevKind == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevKind']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevKind} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.observation == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['observation']}
                        helpText= 'Опишите действия небезопасного поведения или же хорошую практику'
                        isRequired
                        >
                        <InputNewEditorText store={props.store.storeEditData.storeEditObservation} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevObservationKind == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevObservationKind']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevObservationKind} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevObservationType == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevObservationType']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevObservationType} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevObservableCatalog == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevObservableCatalog']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevObservableCatalog} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.observable == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['observable']}
                    isRequired
                    >
                        <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditObservable} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.action == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['action']}
                    isRequired
                    >
                        <InputEditorText store={props.store.storeEditData.storeEditAction} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevRiskDegreeCatalog == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevRiskDegreeCatalog']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevRiskDegreeCatalog} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.executor == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['executor']}
                    isRequired
                    >
                        <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditExecutor} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.responsible == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['responsible']}
                    isRequired
                    >
                        <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditResponsible} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.responsibleForChecking == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['responsibleForChecking']}
                    isRequired
                    >
                        <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditResponsibleForChecking} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevBehaviorType == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevBehaviorType']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevBehaviorType} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.sevArea == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['sevArea']}
                    isRequired
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditSevArea} />
                    </LabelWithContainerOnTwoLine> : null
                }
            </CategoryContainer>


            <Category>
                {currentSevTemplate?.operation == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['operation']}
                    helpText="Добавьте подробное описание проводимой работы, какие СИЗ не были использованы, какие нарушения и т.п."
                    isRequired
                    >
                        <EditorReason store={props.store.storeEditData.storeEditOperation} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentSevTemplate?.reason == true ?
                    <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['reason']}
                    helpText="Укажите причину небезопасного поведения"
                    isRequired
                    >
                        <EditorReason store={props.store.storeEditData.storeEditReason} />
                    </LabelWithContainerOnTwoLine> : null
                }
            </Category>

            {currentSevTemplate?.deadLine ?
                <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['deadLine']}
                isRequired
                >
                    <InputEditorDate store={props.store.storeEditData.storeEditDeadLine} />
                </LabelWithContainerOnTwoLine> : null
            }
            {currentSevTemplate?.deadLine2 ?
                <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['deadLine2']}
                isRequired
                >
                    <InputEditorDate store={props.store.storeEditData.storeEditDeadLine2} />
                </LabelWithContainerOnTwoLine> : null
            }
            {currentSevTemplate?.creationDate ?
                <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['creationDate']}
                isRequired
                >
                    <InputEditorDate store={props.store.storeEditData.storeEditCreationDate} />
                </LabelWithContainerOnTwoLine> : null
            }
            {currentSevTemplate?.date ?
                <LabelWithContainerOnTwoLine label={ITEMS_TEMPLATE_SEV['date']}
                isRequired
                >
                    <InputEditorDate store={props.store.storeEditData.storeEditDate} />
                </LabelWithContainerOnTwoLine> : null
            }
        </AdminPopupEditor>
    );
}

export default observer(FeedbackSEVEditor);
