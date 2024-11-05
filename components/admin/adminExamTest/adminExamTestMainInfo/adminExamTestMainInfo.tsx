import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentEditExamTest} from "../../../../stores/admin/testList/storeAdminPageContentEditExamTest";
import {AdminExamTestMainInfoEditMode} from "./adminExamTestMainInfoEditMode/adminExamTestMainInfoEditMode";
import AdminExamTestMainInfoReadMode from "./adminExamTestMainInfoReadMode/adminExamTestMainInfoReadMode";

function AdminExamTestMainInfo(props: SmartComponentProps<StoreAdminPageContentEditExamTest>) {

    if(props.store.storeEditorExamTestMainInfo) {
        return(
            <AdminExamTestMainInfoEditMode store={props.store.storeEditorExamTestMainInfo}/>
        );
    }

    return (
        <AdminExamTestMainInfoReadMode store={props.store}/>
    );
}

export default observer(AdminExamTestMainInfo);
