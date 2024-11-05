import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import ResourseAligmentLEANEditor
    from "../../components/common/resourseAligmentLEAN/resourseAligmentLEANEditor/resourseAligmentLEANEditor";
import ResourseAligmentLEANFilters
    from "../../components/common/resourseAligmentLEAN/resourseAligmentLEANFilters/resourseAligmentLEANFilters";
import ResourseAligmentLEANItemsList
    from "../../components/common/resourseAligmentLEAN/resourseAligmentLEANItemsList/resourseAligmentLEANItemsList";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectResourceAlignmentLEAN
} from "../../stores/common/pageResourceAlignmentLEAN/storePageProjectResourceAlignmentLEAN";

class PageCommonResourceAlignmentLEAN extends React.Component<PageComponentProps<StorePageProjectResourceAlignmentLEAN>> {

    constructor(props: PageComponentProps<StorePageProjectResourceAlignmentLEAN>) {
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
                <ResourseAligmentLEANFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ResourseAligmentLEANItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ResourseAligmentLEANEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonResourceAlignmentLEAN);
