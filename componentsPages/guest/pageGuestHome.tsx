import { observer } from "mobx-react";
import React from "react";
import { PageContainer } from "../../components/common/pageContainer";
import { GuestHomeHeader } from "../../components/guest/guestHomeHeader";
import { GuestPreviewNewsList } from "../../components/guest/guestPreviewNewsList";
import { GuestWelcomeLettersList } from "../../components/guest/guestWelcomeLettersList";
import { PageComponentProps } from "../../interfaces/pageComponentProps";
import { SmartComponentProps } from "../../interfaces/smartComponentProps";
import { StorePageGuestHome } from "../../stores/guest/home/storePageGuestHome";
import { StorePageGuestHomeContent } from "../../stores/guest/home/storePageGuestHomeContent";

const HeaderWelcomeLetters = observer((props: SmartComponentProps<StorePageGuestHomeContent>) => {
    const headerText: string = 'Приветственные письма';

    if (!Array.isArray(props.store.newsList)) {
        return (<GuestHomeHeader text={headerText} />);
    }

    if (!props.store.newsList.length) {
        return null;
    }

    return (<GuestHomeHeader text={headerText} />);
});

class PageGuestHome extends React.Component<PageComponentProps<StorePageGuestHome>> {

    constructor(props: PageComponentProps<StorePageGuestHome>) {
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
                <GuestPreviewNewsList store={this.props.storePage.storeContentPage} />
                <HeaderWelcomeLetters store={this.props.storePage.storeContentPage} />
                <GuestWelcomeLettersList welcomeLettersList={this.props.storePage.storeContentPage.welcomeLetters} />
            </PageContainer>
        );
    }
}

export default observer(PageGuestHome);
