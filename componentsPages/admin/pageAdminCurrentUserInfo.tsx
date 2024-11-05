import {observer} from "mobx-react";
import React from "react";
import {CurrentUserChangeHistory, CurrentUserInfoReadOnly} from "../../components/common/currentUserInfo";
import CurrentUserFeedback from "../../components/common/currentUserInfo/currentUserFeedback/currentUserFeedback";
import {PageContainer} from "../../components/common/pageContainer";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageCurrentUserInfo} from "../../stores/admin/currentUserInfo/storeAdminPageCurrentUserInfo";

class PageAdminCurrentUserInfo extends React.PureComponent<PageComponentProps<StoreAdminPageCurrentUserInfo>> {
    constructor(props: PageComponentProps<StoreAdminPageCurrentUserInfo>) {
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

        return (
            <PageContainer>
                <CurrentUserInfoReadOnly store={this.props.storePage.storeContentPage.storeCurrentUserInfo}/>
                <CurrentUserFeedback store={this.props.storePage.storeContentPage.storeUserFeedback}/>
                <CurrentUserChangeHistory store={this.props.storePage.storeContentPage.storeUserHistory}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminCurrentUserInfo);
