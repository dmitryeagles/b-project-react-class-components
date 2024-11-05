import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonPageContentSendProjectLEAN";
import {EditableItemActionButtons, ItemContainer} from "../../../common/itemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {ProjectInfo} from "./studentMyProjectLEANComponent";

const StudentMyProjectList = (props: SmartComponentProps<StoreCommonPageContentSendProjectLEAN>) => {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;
    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />
        );
    }

    const itemsList: JSX.Element[] = dataOnCurrentPage.map(data => {
        return (
            <ItemContainer key={data.uuid}>
                <ProjectInfo
                    key={data.uuid}
                    itemUuid={data.uuid}
                    projectInfo={data}
                    projectStore={props}
                    eventStartAddResource={props.store.eventStartEditResource}
                    eventStartAddResult={props.store.eventStartEditResult}
                    eventStartCompletionNotice={props.store.eventCompletionNotice}
                />
                {data.stage === "Ожидает подтверждения" || data.stage === 'Отправлен на доработку' ?
                    <EditableItemActionButtons
                        eventStartEdit={props.store.eventStartChangeItem}
                        eventDeleteItem={props.store.eventStartDeleteItem}
                        itemUuid={data.uuid}
                    /> : null
                }
            </ItemContainer>
        );
    })

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {itemsList}
        </ItemsContainer>
    );
};

export default observer(StudentMyProjectList);
