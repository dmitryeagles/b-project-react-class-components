import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {
    ProjectRegistryActionButtonExport
} from "../../components/common/projectRegistry/projectRegistryActionButtonExport";
import ProjectRegistryEditor from "../../components/common/projectRegistry/projectRegistryEditor/projectRegistryEditor";
import ProjectRegistryFilters
    from "../../components/common/projectRegistry/projectRegistryFilters/projectRegistryFilters";
import ProjectRegistryItemsList
    from "../../components/common/projectRegistry/projectRegistryItemsList/projectRegistryItemsList";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageProjectRegistry} from "../../stores/common/pageProjectRegistry/storePageProjectRegistry";

class PageCommonProjectRegistry extends React.Component<PageComponentProps<StorePageProjectRegistry>> {

    constructor(props: PageComponentProps<StorePageProjectRegistry>) {
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
                <ProjectRegistryActionButtonExport/>
                <ProjectRegistryFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectRegistryItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ProjectRegistryEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonProjectRegistry);
