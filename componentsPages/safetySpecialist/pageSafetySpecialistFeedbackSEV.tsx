import {observer} from "mobx-react";
import React from "react";
import {
    AdminExportSEVActionButton,
    AdminFeedbackSEVEditor,
    AdminFeedbackSEVFilters,
    AdminFeedbackSEVItemsList
} from "../../components/admin/adminFeedbackSEV";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreSafetySpecialistPageFeedbackSEV
} from "../../stores/safetySpecialist/feedbackSEV/storeSafetySpecialistPageFeedbackSEV";

class PageSafetySpecialistFeedbackSEV extends React.PureComponent<PageComponentProps<StoreSafetySpecialistPageFeedbackSEV>> {
    constructor(props: PageComponentProps<StoreSafetySpecialistPageFeedbackSEV>) {
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

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <AdminExportSEVActionButton/>
                <AdminFeedbackSEVFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminFeedbackSEVItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminFeedbackSEVEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageSafetySpecialistFeedbackSEV);
