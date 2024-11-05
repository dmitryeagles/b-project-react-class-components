import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {GuestAllNews} from "../../components/guest/guestAllNews";
import GuestAllNewsFilters from "../../components/guest/guestAllNews/guestAllNewsFilters/guestAllNewsFilters";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageGuestAllNews} from "../../stores/guest/allNews/storePageGuestAllNews";

class PageGuestAllNews extends React.Component<PageComponentProps<StorePageGuestAllNews>> {

    constructor(props: PageComponentProps<StorePageGuestAllNews>) {
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

        return (
            <PageContainer>
                <GuestAllNewsFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <GuestAllNews store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
            </PageContainer>
        );
    }
}

export default observer(PageGuestAllNews);
