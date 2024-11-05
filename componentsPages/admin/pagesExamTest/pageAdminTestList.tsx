import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageTestList} from "../../../stores/admin/testList/storeAdminPageTestList";
import PageContentAdminTestList from "./pageContentAdminTestList";

function PageAdminTestList(props: PageComponentProps<StoreAdminPageTestList>) {

    if (!props.storePage.storeContentPage) {
        return null;
    }

    return (<PageContentAdminTestList store={props.storePage.storeContentPage}/>);
}

export default observer(PageAdminTestList);
