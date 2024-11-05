import {observer} from "mobx-react";
import {dateFormatForView} from "ts-common-helpers";
import {IRegisterProjectRating} from "../../../../interfaces/api/registerProjectsRating";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectRegistryRating
} from "../../../../stores/common/pageProjectRegistryRating/storePageContentProjectRegistryRating";
import {AdminActionButtonsProps} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {EditableItemLargeButton, ItemContainer, ItemContentContainer} from "../../itemContainer";
import {ItemsContainer} from "../../itemsContainer";
import {LabelWithContainerOnOneLine} from "../../labelWithContainerOnOneLine";
import {StubEmptyData} from "../../stubEmptyData";

interface ProjectRegistryRatingItemProps extends AdminActionButtonsProps {
    readonly project: IRegisterProjectRating;
    readonly linkToDetailReport: string;
}

function ProjectRegistryRatingItem(props: ProjectRegistryRatingItemProps) {
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
                <LabelWithContainerOnOneLine label='Рейтинг'>
                    {props.project.score}
                </LabelWithContainerOnOneLine>

            </ItemContentContainer>
            <EditableItemLargeButton
                linkOrEvent={`${props.linkToDetailReport}/${props.project.id}`}
                buttonText={'Подробно'}
            />
        </ItemContainer>
    );
}

function ProjectRegistryRatingItemsList(props: SmartComponentProps<StorePageContentProjectRegistryRating>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const projectRegistryItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        projectRegistryItemsElements.push(
            <ProjectRegistryRatingItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                project={dataOnCurrentPage[i]}
                linkToDetailReport={props.store.linkDetailReport}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {projectRegistryItemsElements}
        </ItemsContainer>
    );
}

export default observer(ProjectRegistryRatingItemsList);
