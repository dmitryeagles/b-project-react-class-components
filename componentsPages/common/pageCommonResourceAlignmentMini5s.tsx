import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import ResourseAligmentMini5sEditor
    from "../../components/common/resourseAligmentMini5s/resourseAligmentMini5sEditor/resourseAligmentMini5sEditor";
import ResourseAligmentMini5sFilters
    from "../../components/common/resourseAligmentMini5s/resourseAligmentMini5sFilters/resourseAligmentMini5sFilters";
import ResourseAligmentMini5sItemsList
    from "../../components/common/resourseAligmentMini5s/resourseAligmentMini5sItemsList/resourseAligmentMini5sItemsList";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectResourceAlignmentMini5s
} from "../../stores/common/pageResourceAlignmentMini5s/storePageProjectResourceAlignmentMini5s";

class PageCommonResourceAlignmentMini5s extends React.Component<PageComponentProps<StorePageProjectResourceAlignmentMini5s>> {

    constructor(props: PageComponentProps<StorePageProjectResourceAlignmentMini5s>) {
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
                <ResourseAligmentMini5sFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ResourseAligmentMini5sItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ResourseAligmentMini5sEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonResourceAlignmentMini5s);
