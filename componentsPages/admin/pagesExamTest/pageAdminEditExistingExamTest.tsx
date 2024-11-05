import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageTestList} from "../../../stores/admin/testList/storeAdminPageTestList";
import PageContentAdminEditExistingExamTest from "./pageContentAdminEditExistingExamTest";

function PageAdminEditExistingExamTest(props: PageComponentProps<StoreAdminPageTestList>) {

    if (!props.storePage.storeContentPage) {
        return null;
    }

    return (<PageContentAdminEditExistingExamTest store={props.storePage.storeContentPage}/>);
}

export default observer(PageAdminEditExistingExamTest);
