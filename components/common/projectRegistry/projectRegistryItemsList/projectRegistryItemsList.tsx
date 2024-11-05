import {observer} from "mobx-react";
import {dateFormatForView} from "ts-common-helpers";
import {Type} from "../../../../api/src";
import {IRegisterProject} from "../../../../interfaces/api/registerProjects";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectRegistry
} from "../../../../stores/common/pageProjectRegistry/storePageContentProjectRegistry";
import {AdminActionButtonsProps} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {EditableItemLargeButton, ItemContainer, ItemContentContainer} from "../../itemContainer";
import {ItemsContainer} from "../../itemsContainer";
import {LabelWithContainerOnOneLine} from "../../labelWithContainerOnOneLine";
import {StandardTagItem} from "../../standardTagItem";
import {StubEmptyData} from "../../stubEmptyData";

interface ProjectRegistryItemProps extends AdminActionButtonsProps {
    readonly project: IRegisterProject<Type>;
    readonly linkToDetailReport?: string;
    readonly linkToDetailMini5sReport?: string;
}

function ProjectRegistryItem(props: ProjectRegistryItemProps) {
    return (
        <ItemContainer>
            <ItemContentContainer>
                <LabelWithContainerOnOneLine label='№'>
                    {props.project.id}
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Работник предложивший идею:'}>
                    {props.project.authorFIO}
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Название проекта:'}>
                    {props.project.name}
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Завод:'}>
                    {props.project.factoryName}
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Тип проекта:'}>
                    {props.project.type}
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Дата создания: '}>
                    {dateFormatForView({
                        date: props.project.dateCreated,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    }) }
                </LabelWithContainerOnOneLine>
                <LabelWithContainerOnOneLine label={'Подразделение: '}>
                    {props.project.unitName}
                </LabelWithContainerOnOneLine>
                {
                    !props.project.stage ? null :
                        <LabelWithContainerOnOneLine label={'Этап:'}>
                            <StandardTagItem
                                tagPublicName={props.project.stage}
                                publicNameMaxLength={100}
                            />
                        </LabelWithContainerOnOneLine>
                }
            </ItemContentContainer>
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

function ProjectRegistryItemsList(props: SmartComponentProps<StorePageContentProjectRegistry>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const projectRegistryItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        projectRegistryItemsElements.push(
            <ProjectRegistryItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                project={dataOnCurrentPage[i]}
                linkToDetailReport={dataOnCurrentPage[i].type === 'Lean' ? props.store.linkDetailReport : undefined}
                linkToDetailMini5sReport={dataOnCurrentPage[i].type === 'Mini5S' ? props.store.linkDetailMini5sReport : undefined}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {projectRegistryItemsElements}
        </ItemsContainer>
    );
}

export default observer(ProjectRegistryItemsList);
