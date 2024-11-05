import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {AdminCreateNewsFilter} from "../../components/admin/adminCreateNews/adminCreateNewsFilter";
import {AdminNewsEditor} from "../../components/admin/adminCreateNews/adminNewsEditor";
import {AdminNewsList} from "../../components/admin/adminCreateNews/adminNewsList";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import PlusIco from "../../img/svg_component/plus.svg";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageCreateNews} from "../../stores/admin/createNews/storeAdminPageCreateNews";

function PageAdminCreateNews(props: PageComponentProps<StoreAdminPageCreateNews>) {
    useEffect(() => {
        props.storePage.eventPageShown();
        return (() => {
            props.storePage.eventPageExit();
        });
    }, []);

    if(!props.storePage.storeContentPage) {
        return null;
    }

    return (
        <PageContainer>
            <AdminActionsButtonsDataManagement
                buttonIco={<PlusIco/>}
                buttonText={'Добавить новость'}
                eventStartAddNewItem={props.storePage.storeContentPage.eventStartAddNewItem}
            />
            <AdminCreateNewsFilter store={props.storePage.storeContentPage.storeFilters}/>
            <AdminNewsList store={props.storePage.storeContentPage}/>
            <Paginate store={props.storePage.storeContentPage.storeDataPagination}/>
            <AdminNewsEditor store={props.storePage.storeContentPage}/>
        </PageContainer>
    );
}

export default observer(PageAdminCreateNews);
