import {observer} from "mobx-react";
import React from "react";
import {CurrentUserChangeHistory, CurrentUserInfoReadOnly} from "../../components/common/currentUserInfo";
import CurrentUserFeedback from "../../components/common/currentUserInfo/currentUserFeedback/currentUserFeedback";
import {PageContainer} from "../../components/common/pageContainer";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageCurrentUserInfo} from "../../stores/common/pageCurrentUserInfo/storeCommonPageCurrentUserInfo";

class PageCommonCurrentUserInfo extends React.PureComponent<PageComponentProps<StoreCommonPageCurrentUserInfo>> {
    constructor(props: PageComponentProps<StoreCommonPageCurrentUserInfo>) {
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

export default observer(PageCommonCurrentUserInfo);
