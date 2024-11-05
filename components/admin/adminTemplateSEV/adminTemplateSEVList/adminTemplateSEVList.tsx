import {observer} from "mobx-react";
import React from "react";
import SuccessIcoSvg from '../../../../img/svg_component/success.svg';
import {AdminFeedbackSEVTemplate} from "../../../../interfaces/api/adminFeedbackSEV";
import {AdminTemplateSEV} from "../../../../interfaces/api/adminTemplateSEV";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {TEMPLATE_SEV_FIELDS_LABELS,} from "../../../../staticData/itemsTemplateSEV";
import {StoreAdminPageContentTemplateSEV} from "../../../../stores/admin/templateSEV/storeAdminPageContentTemplateSEV";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminTemplateSEVListStyle.scss';

//region Шаблон SEV
interface AdminTemplateSEVItemProps extends AdminActionButtonsProps {
    readonly templateSEV: AdminTemplateSEV;
    readonly eventMakeTemplateActive: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AdminTemplateSEVItem = React.memo((props: AdminTemplateSEVItemProps) => {
    const fieldElementsList: JSX.Element[] = [];

    for (let key in props.templateSEV.template) {
        const templateFieldsName: keyof AdminFeedbackSEVTemplate = key as keyof AdminFeedbackSEVTemplate;
        const isActive: boolean = props.templateSEV.template[templateFieldsName];

        if (!isActive) {
            continue;
        }

        if (!TEMPLATE_SEV_FIELDS_LABELS.hasOwnProperty(templateFieldsName)) {
            continue;
        }

        const itemPublicName: string = TEMPLATE_SEV_FIELDS_LABELS[templateFieldsName];

        fieldElementsList.push(
            <StandardTagItem
                tagPublicName={itemPublicName}
                publicNameMaxLength={30}
                key={templateFieldsName}
            />
        );
    }

    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.templateSEV.isActive ? undefined : props.eventDeleteItem}
        >
            <div className={styles.templatePublicName}>
                {
                    props.templateSEV.isActive ?
                        <>
                            <span title={'Шаблон активен'} className={styles.templateActive}/>
                            <span>{` `}</span>
                        </> : null
                }
                <span>{props.templateSEV.templateSEVName}</span>
            </div>
            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.templateSEV.factoryName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Шаблон:'}>
                {fieldElementsList}
            </AdminLabelWithContainerLine>
            {
                !props.templateSEV.isActive ?
                    <div>
                        <div
                            className={styles.btnMakeTemplateActive}
                            onClick={props.eventMakeTemplateActive}
                            data-id={props.itemId}
                        >
                            <SuccessIcoSvg/>
                            <span>{` `}</span>
                            <span>{'Сделать шаблон активным'}</span>
                        </div>
                    </div> : null
            }
        </AdminListItemContainer>
    );
});

//endregion

function AdminTemplateSEVList(props: SmartComponentProps<StoreAdminPageContentTemplateSEV>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>
        );
    }

    const templateSEVElementsList: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        templateSEVElementsList.push(
            <AdminTemplateSEVItem
                key={dataOnCurrentPage[i].uuid}
                templateSEV={dataOnCurrentPage[i]}
                itemId={dataOnCurrentPage[i].uuid}
                eventStartEdit={props.store.isCanEditTemplate ? props.store.eventStartChangeItem : undefined}
                eventDeleteItem={props.store.isCanEditTemplate ? props.store.eventStartDeleteItem : undefined}
                eventMakeTemplateActive={props.store.eventMakeTemplateActive}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {templateSEVElementsList}
        </ItemsContainer>
    );
}

export default observer(AdminTemplateSEVList);
