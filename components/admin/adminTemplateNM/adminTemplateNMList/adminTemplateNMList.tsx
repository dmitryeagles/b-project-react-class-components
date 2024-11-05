import {observer} from "mobx-react";
import React from "react";
import SuccessIcoSvg from '../../../../img/svg_component/success.svg';
import {AdminFeedbackNMTemplate} from "../../../../interfaces/api/adminFeedbackNM";
import {AdminTemplateNM} from "../../../../interfaces/api/adminTemplateNM";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {TEMPLATE_NM_FIELDS_LABELS} from "../../../../staticData/itemsTemplateNM";
import {StoreAdminPageContentTemplateNM} from "../../../../stores/admin/templateNM/storeAdminPageContentTemplateNM";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminTemplateNMListStyle.scss';

//region Шаблон NM
interface AdminTemplateNMItemProps extends AdminActionButtonsProps {
    readonly templateNM: AdminTemplateNM;
    readonly eventMakeTemplateActive: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AdminTemplateNMItem = React.memo((props: AdminTemplateNMItemProps) => {
    const fieldElementsList: JSX.Element[] = [];

    for (let key in props.templateNM.template) {
        const templateFieldsName: keyof AdminFeedbackNMTemplate = key as keyof AdminFeedbackNMTemplate;
        const isActive: boolean = props.templateNM.template[templateFieldsName];

        if (!isActive) {
            continue;
        }

        if (!TEMPLATE_NM_FIELDS_LABELS.hasOwnProperty(templateFieldsName)) {
            continue;
        }

        const itemPublicName: string = TEMPLATE_NM_FIELDS_LABELS[templateFieldsName];

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
            eventDeleteItem={props.templateNM.isActive ? undefined : props.eventDeleteItem}
        >
            <div className={styles.templatePublicName}>
                {
                    props.templateNM.isActive ?
                        <>
                            <span title={'Шаблон активен'} className={styles.templateActive}/>
                            <span>{` `}</span>
                        </> : null
                }
                <span>{props.templateNM.templateNMName}</span>
            </div>
            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.templateNM.factoryName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Шаблон:'}>
                {fieldElementsList}
            </AdminLabelWithContainerLine>
            {
                !props.templateNM.isActive ?
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

function AdminTemplateNMList(props: SmartComponentProps<StoreAdminPageContentTemplateNM>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>
        );
    }

    const templateElementsList: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        templateElementsList.push(
            <AdminTemplateNMItem
                key={dataOnCurrentPage[i].uuid}
                templateNM={dataOnCurrentPage[i]}
                itemId={dataOnCurrentPage[i].uuid}
                eventStartEdit={props.store.isCanEditTemplate ? props.store.eventStartChangeItem : undefined}
                eventDeleteItem={props.store.isCanEditTemplate ? props.store.eventStartDeleteItem : undefined}
                eventMakeTemplateActive={props.store.eventMakeTemplateActive}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {templateElementsList}
        </ItemsContainer>
    );
}

export default observer(AdminTemplateNMList);
