import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {FeedbackSEVEditor, FeedbackSEVFilters, FeedbackSEVItemsList} from "../../components/common/feedbackSEV";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageFeedbackSEV} from "../../stores/common/pageFeedbackSEV/storeCommonPageFeedbackSEV";

class PageCommonFeedbackSEV extends React.Component<PageComponentProps<StoreCommonPageFeedbackSEV>> {

    constructor(props: PageComponentProps<StoreCommonPageFeedbackSEV>) {
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
                    buttonText={'Добавить обращение'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco />}
                />
                <FeedbackSEVFilters store={this.props.storePage.storeContentPage.storeFilters} />
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <FeedbackSEVItemsList store={this.props.storePage.storeContentPage} />
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <FeedbackSEVEditor store={this.props.storePage.storeContentPage} />
            </PageContainer>
        );
    }
}

export default observer(PageCommonFeedbackSEV);
