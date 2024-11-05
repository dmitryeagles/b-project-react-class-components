import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentTestListMain} from "../../../../stores/admin/testList/storeAdminPageContentTestListMain";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import AdminExamTestItem from "./adminExamTestItem";

function AdminExamTestsList(props: SmartComponentProps<StoreAdminPageContentTestListMain>) {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Отсутствуют тесты для отображения'}/>);
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {dataOnCurrentPage.map((itemTest) =>
                <AdminExamTestItem
                    key={itemTest.uuid}
                    examTest={itemTest}
                    linkEditItem={props.store.linkEditExistingExamTest}
                    eventDeleteItem={props.store.eventStartDeleteTest}
                    linkDemoViewTestExam={props.store.linkRunDemoTest}
                />
            )}
        </ItemsContainer>
    );
}

export default observer(AdminExamTestsList);
