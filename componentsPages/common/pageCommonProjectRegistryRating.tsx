import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import ProjectRegistryRatingEditor
    from "../../components/common/projectRegistryRating/projectRegistryRatingEditor/projectRegistryRatingEditor";
import ProjectRegistryRatingFilters
    from "../../components/common/projectRegistryRating/projectRegistryRatingFilters/projectRegistryRatingFilters";
import ProjectRegistryRatingItemsList
    from "../../components/common/projectRegistryRating/projectRegistryRatingItemsList/projectRegistryRatingItemsList";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectRegistryRating
} from "../../stores/common/pageProjectRegistryRating/storePageProjectRegistryRating";

class PageCommonProjectRegistryRating extends React.Component<PageComponentProps<StorePageProjectRegistryRating>> {

    constructor(props: PageComponentProps<StorePageProjectRegistryRating>) {
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
                <ProjectRegistryRatingFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectRegistryRatingItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ProjectRegistryRatingEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonProjectRegistryRating);
