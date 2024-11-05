import {observer} from "mobx-react";
import React from "react";
import {AdminExamTestMainInfo} from "../../../components/admin/adminExamTest/adminExamTestMainInfo";
import {AdminExistingExamTestContent} from "../../../components/admin/adminExamTest/adminExistingExamTestContent";
import {StubDataLoading} from "../../../components/common/stubDataLoading";
import {StubErrorGetData} from "../../../components/common/stubErrorGetData";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreAdminPageContentTestListMain} from "../../../stores/admin/testList/storeAdminPageContentTestListMain";

class PageContentAdminEditExistingExamTest extends React.PureComponent<SmartComponentProps<StoreAdminPageContentTestListMain>> {
    constructor(props: SmartComponentProps<StoreAdminPageContentTestListMain>) {
        super(props);
    }

    public componentDidMount() {
        this.props.store.eventShowPageEditExistingExamTest();
    }

    public componentWillUnmount() {
        this.props.store.eventExitPageEditExistingExamTest();
    }

    public render() {
        if (this.props.store.storeErrorWhileGettingData.errorText) {
            return (<StubErrorGetData errorText={this.props.store.storeErrorWhileGettingData.errorText}/>);
        }

        if (!this.props.store.storeFlagDataReceived.status) {
            return (<StubDataLoading loadingDataText={'Загрузка тестов'}/>);
        }

        if(!this.props.store.storeEditorExamTest.storeEditor) {
            return null;
        }

        if(this.props.store.storeEditorExamTest.storeEditor.storeError.errorText) {
            return (<StubErrorGetData errorText={this.props.store.storeEditorExamTest.storeEditor.storeError.errorText}/>);
        }

        return (
            <>
                <AdminExamTestMainInfo store={this.props.store.storeEditorExamTest.storeEditor}/>
                <AdminExistingExamTestContent store={this.props.store.storeEditorExamTest.storeEditor}/>
            </>
        );
    }
}

export default observer(PageContentAdminEditExistingExamTest);
