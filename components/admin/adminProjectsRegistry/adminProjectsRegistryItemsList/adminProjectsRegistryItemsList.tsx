import {observer} from "mobx-react";
import {dateFormatForView} from "ts-common-helpers";
import {Type} from "../../../../api/src";
import {IRegisterProject} from "../../../../interfaces/api/registerProjects";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectsAdminRegistry
} from "../../../../stores/admin/projectsAdminRegistry/storePageContentProjectsAdminRegistry";
import {EditableItemLargeButton, ItemContainer} from "../../../common/itemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminProjectsRegistryItemsListStyle.scss';

interface ProjectAdminLEANItemProps extends AdminActionButtonsProps {
    readonly project: IRegisterProject<Type>;
    readonly linkToDetailReport?: string;
    readonly linkToDetailMini5sReport?: string;
}


function AdminProjectsRegistryItem(props: ProjectAdminLEANItemProps) {


    return (
        <ItemContainer>
            <AdminListItemContainer
                itemId={props.itemId}
                eventStartEdit={props.eventStartEdit}
                eventDeleteItem={props.eventDeleteItem}
                className = {styles.itemContainer}
            >
                <AdminLabelWithContainerLine label={'№'}>
                    {props.project.id}
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Работник предложивший идею:'}>
                    {props.project.authorFIO}
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Название проекта:'}>
                    {props.project.name}
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Завод:'}>
                    {props.project.factoryName}
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Тип проекта:'}>
                    {props.project.type}
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Дата создания: '}>
                    {dateFormatForView({
                        date: props.project.dateCreated,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    }) }
                </AdminLabelWithContainerLine>
                <AdminLabelWithContainerLine label={'Подразделение: '}>
                    {props.project.unitName}
                </AdminLabelWithContainerLine>
                { !props.project.stage ? null :
                <AdminLabelWithContainerLine label={'Этап:'}>
                    <StandardTagItem
                        tagPublicName={props.project.stage}
                        publicNameMaxLength={100}
                    />
                </AdminLabelWithContainerLine>
                }
            </AdminListItemContainer>
            {
                props.project.type === 'Lean' && props.linkToDetailReport ?
                    <EditableItemLargeButton
                        linkOrEvent={`${props.linkToDetailReport}/${props.project.id}`}
                        buttonText={'Подробно'}
                    /> : props.project.type === 'Mini5S' && props.linkToDetailMini5sReport ?
                    <EditableItemLargeButton
                        linkOrEvent={`${props.linkToDetailMini5sReport}/${props.project.id}`}
                        buttonText={'Подробно'}
                    /> : null
            }
        </ItemContainer>
    );
}

function AdminProjectsRegistryItemsList(props: SmartComponentProps<StorePageContentProjectsAdminRegistry>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const feedbackSEVItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        feedbackSEVItemsElements.push(
            <AdminProjectsRegistryItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                project={dataOnCurrentPage[i]}
                eventDeleteItem={props.store.eventStartDeleteItem}
                linkToDetailReport={dataOnCurrentPage[i].type === 'Lean' ? props.store.linkDetailReport : undefined}
                linkToDetailMini5sReport={dataOnCurrentPage[i].type === 'Mini5S' ? props.store.linkDetailMini5sReport : undefined}
                //eventStartEdit={props.store.eventStartChangeItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {feedbackSEVItemsElements}
        </ItemsContainer>
    );
}

export default observer(AdminProjectsRegistryItemsList);
