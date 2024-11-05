import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import ProjectLeanResourceManagerEditor
    from "../../components/resourceApprovingManager/projectLeanResourceManager/projectLeanResourceManagerEditor/projectLeanResourceManagerEditor";
import ProjectLeanResourceManagerFilters
    from "../../components/resourceApprovingManager/projectLeanResourceManager/projectLeanResourceManagerFilters/projectLeanResourceManagerFilters";
import ProjectLeanResourceManagerItemsList
    from "../../components/resourceApprovingManager/projectLeanResourceManager/projectLeanResourceManagerItemsList/projectLeanResourceManagerItemsList";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectResourceManagerLEAN
} from "../../stores/resourceApprovingManager/projectResourceApprovingManagerLEAN/storePageProjectResourceManagerLEAN";

class PageProjectLEANResourceApprovingManager extends React.PureComponent<PageComponentProps<StorePageProjectResourceManagerLEAN>> {
    constructor(props: PageComponentProps<StorePageProjectResourceManagerLEAN>) {
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

        if(this.props.storePage.storeContentPage.errorWhileGettingData){
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <ProjectLeanResourceManagerFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectLeanResourceManagerItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ProjectLeanResourceManagerEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageProjectLEANResourceApprovingManager);
