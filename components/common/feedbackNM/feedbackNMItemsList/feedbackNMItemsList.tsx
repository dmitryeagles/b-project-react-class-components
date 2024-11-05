import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {UserNMList} from "../../../../interfaces/api/userNMList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {TEMPLATE_NM_FIELDS_LABELS} from "../../../../staticData/itemsTemplateNM";
import {
    StoreCommonPageContentFeedbackNM
} from "../../../../stores/common/pageFeedbackNM/storeCommonPageContentFeedbackNM";
import {AdminListItemContainer} from "../../../admin/adminListItemContainer";
import {AdminActionButtonsProps} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {DropdownSelectItem} from "../../dropdownSelect/dropdownSelect";
import {ItemsContainer} from "../../itemsContainer";
import {LabelWithContainerOnOneLine} from "../../labelWithContainerOnOneLine";
import {StandardTagItem} from "../../standardTagItem";
import {StubEmptyData} from "../../stubEmptyData";
import {ValidOrInvalidUrlImage} from "../../validOrInvalidUrlImage";
import styles from "./feedbackNMItemsListStyle.scss";

//region Список сотрудников
interface NMParticipantsItemsListProps {
    readonly participantsItemsList: DropdownSelectItem<string>[];
}

const NMParticipantsItemsList = React.memo((props: NMParticipantsItemsListProps) => {
    return (
        <>
            {props.participantsItemsList.map((item) =>
                <StandardTagItem
                    key={item.value}
                    publicNameMaxLength={30}
                    tagPublicName={item.label}
                />
            )}
        </>
    );
});
//endregion

interface FeedbackNMItemsProps extends AdminActionButtonsProps {
    readonly nmItem:UserNMList;
}

const FeedbackNMItems = React.memo((props: FeedbackNMItemsProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.nmItem.statusId === 1 || props.nmItem.statusId === 3 || props.nmItem.statusId === 4 ? props.eventStartEdit : undefined}
            eventDeleteItem={props.eventDeleteItem}
        >
            {
                props.nmItem.nmKindName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMKind']}: `}
                    >
                        {props.nmItem.nmKindName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.nmAreaName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMArea']}: `}
                    >
                        {props.nmItem.nmAreaName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.nmRiskName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMRisk']}: `}
                    >
                        {props.nmItem.nmRiskName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.nmPossibleInjuryName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMPossibleInjury']}: `}
                    >
                        {props.nmItem.nmPossibleInjuryName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.detectTechNM ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['detectTechNM']}: `}
                    >
                        {props.nmItem.detectTechNM}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.detectUserName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['detectUser']}: `}
                    >
                        {props.nmItem.detectUserName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.registrationDate ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['registrationDate']}: `}
                    >
                        {
                            dateFormatForView({
                                format: 'DD.MM.YYYY',
                                defaultValue: '-',
                                date: props.nmItem.registrationDate
                            })
                        }
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.closedNMDate ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['closedNMDate']}: `}
                    >
                        {dateFormatForView({
                            date: props.nmItem.closedNMDate,
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.closedTechNMDate ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['closedTechNMDate']}: `}
                    >
                        {
                            dateFormatForView({
                                date: props.nmItem.closedTechNMDate,
                                format: 'DD.MM.YYYY',
                                defaultValue: '-'
                            })
                        }
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.removalTechNMDate ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['removalTechNMDate']}: `}
                    >
                        {
                            dateFormatForView({
                                date: props.nmItem.removalTechNMDate,
                                format: 'DD.MM.YYYY',
                                defaultValue: '-'
                            })}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.nmTagClassificationName ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['NMTagClassification']}: `}
                    >
                        {props.nmItem.nmTagClassificationName}
                    </LabelWithContainerOnOneLine>: null
            }
            {
                props.nmItem.summary ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['summary']}: `}
                    >
                        {props.nmItem.summary}
                    </LabelWithContainerOnOneLine>: null
            }
            {
                props.nmItem.summaryQuality ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['summaryQuality']}: `}
                    >
                        {props.nmItem.summaryQuality}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.takenSteps ?
                    <LabelWithContainerOnOneLine
                        label={`${TEMPLATE_NM_FIELDS_LABELS['takenSteps']}: `}
                    >
                        {props.nmItem.takenSteps}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.statusName ?
                    <LabelWithContainerOnOneLine
                        label={ 'Статус: '}
                    >
                        {props.nmItem.statusName}
                    </LabelWithContainerOnOneLine>: null
            }
            {
                props.nmItem.nmParticipants.length > 0 ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['NMParticipants']}: `}>
                        <NMParticipantsItemsList participantsItemsList={props.nmItem.nmParticipants}/>
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.nmEquipmentName ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['NMEquipment']}: `}>
                        {props.nmItem.nmEquipmentName}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.problemDescription ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['problemDescription']}: `}>
                        {props.nmItem.problemDescription}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.removalDescription ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['removalDescription']}: `}>
                        {props.nmItem.removalDescription}
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.openingDate ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['openingDate']}: `}>
                        {
                            dateFormatForView({
                                date:props.nmItem.openingDate,
                                format: 'DD.MM.YYYY'
                            })
                        }
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.dateOfPossibleElimination ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['dateOfPossibleElimination']}: `}>
                        {
                            dateFormatForView({
                                date:props.nmItem.dateOfPossibleElimination,
                                format: 'DD.MM.YYYY'
                            })
                        }
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.eliminated.length ?
                    <LabelWithContainerOnOneLine label={`${TEMPLATE_NM_FIELDS_LABELS['eliminated']}: `}>
                        {
                            props.nmItem.eliminated.map(item =><StandardTagItem
                                key={item.value}
                                publicNameMaxLength={30}
                                tagPublicName={item.label}
                            />)
                        }
                    </LabelWithContainerOnOneLine> : null
            }
            {
                props.nmItem.comment.length > 0 ?
                    <div className={styles.commentTextContainer}>
                                <span className={styles.commentTextLabel}>
                                    <span>{`${TEMPLATE_NM_FIELDS_LABELS['comment']}: `}</span>
                                    <span className={styles.commentTextLabelIco}>!</span>
                                </span>
                        {props.nmItem.comment}
                    </div> : null
            }
            <div className={styles.imgContainer}>
                {
                    props.nmItem.photoBefore?.url ?
                        <ValidOrInvalidUrlImage imageUrl={props.nmItem.photoBefore.url} label={`${TEMPLATE_NM_FIELDS_LABELS['photoBefore']}:`}/>
                        : null
                }
                {
                    props.nmItem.photoAfter?.url ?
                        <ValidOrInvalidUrlImage imageUrl={props.nmItem.photoAfter.url} label={`${TEMPLATE_NM_FIELDS_LABELS['photoAfter']}:`}/>
                        : null
                }
            </div>
        </AdminListItemContainer>
    )
});

const FeedbackNMItemsList = (props: SmartComponentProps<StoreCommonPageContentFeedbackNM>) => {
    const dataOnCurrentPage: UserNMList[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {
                dataOnCurrentPage.map(nmItem =>
                    <FeedbackNMItems
                        key={nmItem.uuid}
                        itemId={nmItem.uuid}
                        nmItem={nmItem}
                        eventDeleteItem={props.store.eventStartDeleteItem}
                        eventStartEdit={props.store.eventStartChangeItem}
                    />)
            }
        </ItemsContainer>
    );
};

export default observer(FeedbackNMItemsList);
