import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import GuestNewsDetails from "../../components/guest/guestNewsDetails/guestNewsDetails";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageGuestNewsDetails} from "../../stores/guest/newsDetail/storePageGuestNewsDetails";

class PageGuestNewsDetails extends React.Component<PageComponentProps<StorePageGuestNewsDetails>> {

    constructor(props: PageComponentProps<StorePageGuestNewsDetails>) {
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
                <GuestNewsDetails store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageGuestNewsDetails);
