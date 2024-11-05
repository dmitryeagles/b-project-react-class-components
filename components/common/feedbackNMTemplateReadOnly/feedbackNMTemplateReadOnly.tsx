import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {AdminFeedbackNMTemplate} from "../../../interfaces/api/adminFeedbackNM";
import {TEMPLATE_NM_FIELDS_LABELS} from "../../../staticData/itemsTemplateNM";
import {AdminLabelWithContainerLine} from "../../admin/adminLabelWithContainerLine";
import {StandardTagItem} from "../standardTagItem";
import {ValidOrInvalidUrlImage} from "../validOrInvalidUrlImage";
import styles from './feedbackNMTemplateReadOnlyStyle.scss';

interface FeedbackNMTemplateReadOnlyProps {
    readonly template: AdminFeedbackNMTemplate;
}

function FeedbackNMTemplateReadOnly(props: FeedbackNMTemplateReadOnlyProps) {
    const templateElementsList: JSX.Element[] = [];

    for (const key in props.template) {
        const templateItemKey: keyof AdminFeedbackNMTemplate = key as keyof AdminFeedbackNMTemplate

        if (templateItemKey === 'photoBefore' || templateItemKey === 'photoAfter') {
            continue;
        }

        const itemTemplate = props.template[templateItemKey as keyof AdminFeedbackNMTemplate];

        if (itemTemplate.fieldTypeKey === 'date') {
            if (itemTemplate.value) {
                templateElementsList.push(
                    <AdminLabelWithContainerLine key={templateItemKey} label={`${TEMPLATE_NM_FIELDS_LABELS[templateItemKey]}:`}>
                        {
                            dateFormatForView({
                                date: itemTemplate.value,
                                format: 'DD.MM.YYYY',
                                defaultValue: ''
                            })
                        }
                    </AdminLabelWithContainerLine>
                );
                continue;
            }
        }

        if (itemTemplate.fieldTypeKey === 'string') {
            if (itemTemplate.value) {
                templateElementsList.push(
                    <AdminLabelWithContainerLine key={templateItemKey} label={`${TEMPLATE_NM_FIELDS_LABELS[templateItemKey]}:`}>
                        {itemTemplate.value}
                    </AdminLabelWithContainerLine>
                );
                continue;
            }
        }

        if (itemTemplate.fieldTypeKey === 'dropdownString') {
            if (itemTemplate.value.length) {
                templateElementsList.push(
                    <AdminLabelWithContainerLine
                        key={templateItemKey}
                        label={`${TEMPLATE_NM_FIELDS_LABELS[templateItemKey]}:`}>
                        {
                            itemTemplate.value.map((item) =>
                                <StandardTagItem
                                    key={item.value}
                                    tagPublicName={item.label}
                                    publicNameMaxLength={30}
                                />
                            )
                        }
                    </AdminLabelWithContainerLine>);
            }
        }
    }

    return (
        <div>
            {templateElementsList}
            {
                (!props.template.photoBefore.value && !props.template.photoAfter.value) ?
                     null :<div>
                        {
                            props.template.photoBefore.value ?
                                <div className={styles.imageWrapper}>
                                    <ValidOrInvalidUrlImage
                                        imageUrl={props.template.photoBefore.value}
                                        label={`${TEMPLATE_NM_FIELDS_LABELS.photoBefore}:`}
                                    />
                                </div>
                                : null
                        }
                        {
                            props.template.photoAfter.value ?
                                <div className={styles.imageWrapper}>
                                    <ValidOrInvalidUrlImage
                                        imageUrl={props.template.photoAfter.value}
                                        label={`${TEMPLATE_NM_FIELDS_LABELS.photoAfter}:`}
                                    />
                                </div> : null
                        }
                    </div>
            }
        </div>
    );
}

export default React.memo(FeedbackNMTemplateReadOnly);
