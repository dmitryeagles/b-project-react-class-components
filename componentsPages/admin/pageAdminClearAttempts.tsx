import {observer} from "mobx-react";
import React from "react";
import AdminClearAttempsAddAttemptsToUser
    from "../../components/admin/adminClearAttempts/adminClearAttempsAddAttemptsToUser/adminClearAttempsAddAttemptsToUser";
import AdminClearAttemptsActionButtons
    from "../../components/admin/adminClearAttempts/adminClearAttemptsActionButtons/adminClearAttemptsActionButtons";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageClearAttempts} from "../../stores/admin/clearAttempts/storeAdminPageClearAttempts";


class PageAdminClearAttempts extends React.PureComponent<PageComponentProps<StoreAdminPageClearAttempts>> {
    constructor(props: PageComponentProps<StoreAdminPageClearAttempts>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    public render() {
        if (!this.props.storePage.storeContentPage) {
            return null;
        }

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <AdminClearAttemptsActionButtons store={this.props.storePage.storeContentPage}/>
                <AdminClearAttempsAddAttemptsToUser store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminClearAttempts);
