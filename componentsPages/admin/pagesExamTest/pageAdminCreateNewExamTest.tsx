import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageTestList} from "../../../stores/admin/testList/storeAdminPageTestList";
import PageContentAdminCreateNewExamTest from "./pageContentAdminCreateNewExamTest";

function PageAdminCreateNewExamTest(props: PageComponentProps<StoreAdminPageTestList>){

    if(!props.storePage.storeContentPage) {
        return null;
    }

    return (<PageContentAdminCreateNewExamTest store={props.storePage.storeContentPage}/>);
}

export default observer(PageAdminCreateNewExamTest);
