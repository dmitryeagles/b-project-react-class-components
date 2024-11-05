import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {TEMPLATE_NM_FIELDS_LABELS, TEMPLATE_NM_FIELDS_REQUIRED} from "../../../../staticData/itemsTemplateNM";
import {StoreCommonEditFeedbackNM} from "../../../../stores/common/pageFeedbackNM/storeCommonEditFeedbackNM";
import {
    StoreCommonPageContentFeedbackNM
} from "../../../../stores/common/pageFeedbackNM/storeCommonPageContentFeedbackNM";
import {StoreComponentDropdownMultiSelect} from "../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputDate} from "../../../../stores/common/storeComponentInputDate";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {DropdownMultiSelect} from "../../dropdownMultiSelect";
import {DropdownSelect} from "../../dropdownSelect";
import {InputDate} from "../../inputDate";
import {InputText} from "../../inputText";
import {LabelWithContainerOnTwoLine} from "../../labelWithContainerOnTwoLine";
import {FeedbackNMUploadFilePreviewImage} from "../index";
import styles from './feedbackNMEditorStyle.scss';

const InputEditorText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
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

const DropdownMultiSelectEditorValueString = observer((props: SmartComponentProps<StoreComponentDropdownMultiSelect<string>>) => {
    return (
        <>
            <DropdownMultiSelect
                isClearable={true}
                eventChange={props.store.eventChangeValues}
                placeholder={props.store.placeholder}
                selectedValues={props.store.selectedValues}
                optionsList={props.store.optionsList}
                maxLimit={props.store.maxLimit}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});

const UploadFilePreviewImagePhotoBefore = observer((props: SmartComponentProps<StoreCommonEditFeedbackNM>) => {
    return (
        <FeedbackNMUploadFilePreviewImage
            previewImagePath={props.store.storeEditImageBefore.previewImagePath}
            classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
            isSelectedPreviewImageFile={!!props.store.storeEditImageBefore.uploadFileImage}
            errorText={props.store.storeEditImageBefore.errorUploadFileImage}
            eventSelectedPreviewImageFile={props.store.storeEditImageBefore.eventSelectedPreviewImageFile }
            eventResetSelectedPreviewImageFile={props.store.storeEditImageBefore.eventResetSelectedPreviewImageFile}
        />
    );
});

const UploadFilePreviewImagePhotoAfter = observer((props: SmartComponentProps<StoreCommonEditFeedbackNM>) => {
    return (
        <FeedbackNMUploadFilePreviewImage
            previewImagePath={props.store.storeEditImageAfter.previewImagePath}
            classNameAreaAction={styles.areaActionButtonsPreviewImageFile}
            isSelectedPreviewImageFile={!!props.store.storeEditImageAfter.uploadFileImage}
            errorText={props.store.storeEditImageAfter.errorUploadFileImage}
            eventSelectedPreviewImageFile={props.store.storeEditImageAfter.eventSelectedPreviewImageFile }
            eventResetSelectedPreviewImageFile={props.store.storeEditImageAfter.eventResetSelectedPreviewImageFile}
        />
    );
});

interface CategoryContainerProps {
    readonly categoryTitle: string;
    readonly children: React.ReactNode;
    readonly gridContainer?: boolean;
}

const CategoryContainer = React.memo((props: CategoryContainerProps) => {
    return (
        <div>
            <div className={styles.categorySeparator}>
                {props.categoryTitle}
            </div>
            <div className={props.gridContainer ? styles.gridContentContainer : styles.categoryContentContainer}>
                {props.children}
            </div>
        </div>
    );
});

function FeedbackNMEditor(props: SmartComponentProps<StoreCommonPageContentFeedbackNM>) {
    if (!props.store.storeEditData) {
        return null;
    }

    const currentNMTemplate = props.store.storeEditData.currentNMTemplate;

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <CategoryContainer categoryTitle={'Данные NearMiss'}>
                {currentNMTemplate?.template?.NMKind == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMKind']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['NMKind']}
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditNMKind} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.NMArea == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMArea']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['NMArea']}
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditNMArea} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.NMRisk == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMRisk']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['NMRisk']}
                    >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditNMRisk} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.NMPossibleInjury == true ?
                    <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['NMPossibleInjury']}:`} >
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditNMPossibleInjury}/>
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.detectTechNM == true ?
                    <LabelWithContainerOnTwoLine label={'Выявивший Tech NearMiss:'}>
                        <InputEditorText store={props.store.storeEditData.storeEditDetectTechNM} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.detectUser == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['detectUser']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['detectUser']}
                    >
                        <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditDetectUser}/>
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.NMParticipants == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMParticipants']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['NMParticipants']}
                    >
                        <DropdownMultiSelectEditorValueString store={props.store.storeEditData.storeEditNMParticipants}/>
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.NMTagClassification == true ?
                    <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['NMTagClassification']}:`}>
                        <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditNMTagClassification} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.summary == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['summary']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['summary']}
                    >
                        <InputEditorText store={props.store.storeEditData.storeEditSummary} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.summaryQuality == true ?
                    <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['summaryQuality']}:`}>
                        <InputEditorText store={props.store.storeEditData.storeEditSummaryQuality} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.takenSteps == true ?
                    <LabelWithContainerOnTwoLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['takenSteps']}:`}
                        isRequired={TEMPLATE_NM_FIELDS_REQUIRED['takenSteps']}
                    >
                        <InputEditorText
                            store={props.store.storeEditData.storeEditTakenSteps}/>
                    </LabelWithContainerOnTwoLine> : null
                }
                {currentNMTemplate?.template?.comment == true ?
                    <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['comment']}:`}>
                        <InputEditorText store={props.store.storeEditData.storeEditComment} />
                    </LabelWithContainerOnTwoLine> : null
                }
                {

                    props.store.storeEditData.storeProblemDescription ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['problemDescription']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['problemDescription']}
                        >
                            <InputEditorText store={props.store.storeEditData.storeProblemDescription} />
                        </LabelWithContainerOnTwoLine> : null
                }

                {
                    props.store.storeEditData.storeRemovalDescription ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['removalDescription']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['removalDescription']}
                        >
                            <InputEditorText store={props.store.storeEditData.storeRemovalDescription} />
                        </LabelWithContainerOnTwoLine> : null
                }
                {

                    props.store.storeEditData.storeEquipment ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['NMEquipment']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['NMEquipment']}
                        >
                            <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEquipment} />
                        </LabelWithContainerOnTwoLine> : null
                }
                {

                    props.store.storeEditData.storeEliminatedUser ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['eliminated']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['eliminated']}
                        >
                            <DropdownMultiSelectEditorValueString store={props.store.storeEditData.storeEliminatedUser} />
                        </LabelWithContainerOnTwoLine> : null
                }
                {

                    props.store.storeEditData.storeDateOfPossibleElimination ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['dateOfPossibleElimination']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['dateOfPossibleElimination']}
                        >
                            <InputEditorDate store={props.store.storeEditData.storeDateOfPossibleElimination} />
                        </LabelWithContainerOnTwoLine> : null
                }
                {

                    props.store.storeEditData.storeOpeningDate ?
                        <LabelWithContainerOnTwoLine
                            label={`${TEMPLATE_NM_FIELDS_LABELS['openingDate']}:`}
                            isRequired={TEMPLATE_NM_FIELDS_REQUIRED['openingDate']}
                        >
                            <InputEditorDate store={props.store.storeEditData.storeOpeningDate} />
                        </LabelWithContainerOnTwoLine> : null
                }
            </CategoryContainer>
            {
                currentNMTemplate?.template?.photoBefore || currentNMTemplate?.template?.photoAfter ?
                    <CategoryContainer categoryTitle={'Фото: '} gridContainer={true}>
                        {currentNMTemplate?.template?.photoBefore ?
                            <LabelWithContainerOnTwoLine
                                label={`${TEMPLATE_NM_FIELDS_LABELS['photoBefore']}:`}
                                isRequired={TEMPLATE_NM_FIELDS_REQUIRED['photoBefore']}
                            >
                                <div className={styles.itemImgContainer}>
                                    <UploadFilePreviewImagePhotoBefore store={props.store.storeEditData}/>
                                </div>
                            </LabelWithContainerOnTwoLine> : null
                        }

                        {currentNMTemplate?.template?.photoAfter ?
                            <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['photoAfter']}:`}>
                                <div className={styles.itemImgContainer}>
                                    <UploadFilePreviewImagePhotoAfter store={props.store.storeEditData}/>
                                </div>
                            </LabelWithContainerOnTwoLine> : null
                        }
                    </CategoryContainer> : null
            }
            {
                currentNMTemplate?.template?.registrationDate || currentNMTemplate?.template?.closedNMDate || currentNMTemplate?.template?.closedTechNMDate || currentNMTemplate?.template?.removalTechNMDate ?
                    <CategoryContainer categoryTitle={'Даты: '} gridContainer={true}>
                        {currentNMTemplate?.template?.registrationDate ?
                            <LabelWithContainerOnTwoLine
                                label={`${TEMPLATE_NM_FIELDS_LABELS['registrationDate']}:`}
                                isRequired={TEMPLATE_NM_FIELDS_REQUIRED['registrationDate']}
                            >
                                <InputEditorDate store={props.store.storeEditData.storeEditRegistrationDate} />
                            </LabelWithContainerOnTwoLine> : null
                        }
                        {currentNMTemplate?.template?.closedNMDate ?
                            <LabelWithContainerOnTwoLine
                                label={`${TEMPLATE_NM_FIELDS_LABELS['closedNMDate']}:`}
                                isRequired={TEMPLATE_NM_FIELDS_REQUIRED['closedNMDate']}
                            >
                                <InputEditorDate store={props.store.storeEditData.storeEditClosedNMDate} />
                            </LabelWithContainerOnTwoLine> : null
                        }
                        {currentNMTemplate?.template?.closedTechNMDate ?
                            <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['closedTechNMDate']}:`}>
                                <InputEditorDate store={props.store.storeEditData.storeEditClosedTechNMDate} />
                            </LabelWithContainerOnTwoLine> : null
                        }
                        {currentNMTemplate?.template?.removalTechNMDate ?
                            <LabelWithContainerOnTwoLine label={`${TEMPLATE_NM_FIELDS_LABELS['removalTechNMDate']}:`}>
                                <InputEditorDate store={props.store.storeEditData.storeEditRemovalTechNMDate} />
                            </LabelWithContainerOnTwoLine> : null
                        }
                    </CategoryContainer> : null
            }
        </AdminPopupEditor>
    );
}

export default observer(FeedbackNMEditor);
