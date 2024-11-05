import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {AdminFeedbackSEVTemplate} from "../../../interfaces/api/adminFeedbackSEV";
import {TEMPLATE_SEV_FIELDS_LABELS} from "../../../staticData/itemsTemplateSEV";
import {AdminLabelWithContainerLine} from "../../admin/adminLabelWithContainerLine";

interface FeedbackSEVTemplateReadOnlyProps {
    readonly template: AdminFeedbackSEVTemplate;
}

function FeedbackSEVTemplateReadOnly(props: FeedbackSEVTemplateReadOnlyProps) {
    const templateElementsList: JSX.Element[] = [];

    for (const key in props.template) {
        const templateItemKey: keyof AdminFeedbackSEVTemplate = key as keyof AdminFeedbackSEVTemplate

        const itemTemplate = props.template[templateItemKey as keyof AdminFeedbackSEVTemplate];

        if (itemTemplate.fieldTypeKey === 'date') {
            if (itemTemplate.value) {
                templateElementsList.push(
                    <AdminLabelWithContainerLine key={templateItemKey} label={`${TEMPLATE_SEV_FIELDS_LABELS[templateItemKey]}:`}>
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
                    <AdminLabelWithContainerLine key={templateItemKey} label={`${TEMPLATE_SEV_FIELDS_LABELS[templateItemKey]}:`}>
                        {itemTemplate.value}
                    </AdminLabelWithContainerLine>
                );
            }
        }
    }

    return (
        <div>
            {templateElementsList}
        </div>
    );
}

export default React.memo(FeedbackSEVTemplateReadOnly);
