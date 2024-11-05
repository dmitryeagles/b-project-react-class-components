import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {FeedbackNMEditor, FeedbackNMFilters, FeedbackNMItemsList} from "../../components/common/feedbackNM";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageFeedbackNM} from "../../stores/common/pageFeedbackNM/storeCommonPageFeedbackNM";

class PageCommonFeedbackNM extends React.Component<PageComponentProps<StoreCommonPageFeedbackNM>> {

    constructor(props: PageComponentProps<StoreCommonPageFeedbackNM>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        if (!this.props.storePage.storeContentPage) {
            return null;
        }

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData} />
            );
        }

        return (
            <PageContainer>
                <AdminActionsButtonsDataManagement
                    buttonText={'Добавить NearMiss'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco />}
                />
                <FeedbackNMFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <FeedbackNMItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <FeedbackNMEditor store={this.props.storePage.storeContentPage} />
            </PageContainer>
        );
    }
}

export default observer(PageCommonFeedbackNM);
