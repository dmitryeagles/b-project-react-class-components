import {observer} from "mobx-react";
import React from "react";
import {AdminExportNMActionButton} from "../../components/admin/adminFeedbackNM/adminExportNMActionButton";
import AdminFeedbackNMEditor from "../../components/admin/adminFeedbackNM/adminFeedbackNMEditor/adminFeedbackNMEditor";
import AdminFeedbackNMFilters
    from "../../components/admin/adminFeedbackNM/adminFeedbackNMFilters/adminFeedbackNMFilters";
import AdminFeedbackNMItemsList
    from "../../components/admin/adminFeedbackNM/adminFeedbackNMItemsList/adminFeedbackNMItemsList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreSafetySpecialistPageFeedbackNM
} from "../../stores/safetySpecialist/feedbackNM/storeSafetySpecialistPageFeedbackNM";

class PageSafetySpecialistFeedbackNM extends React.PureComponent<PageComponentProps<StoreSafetySpecialistPageFeedbackNM>> {
    constructor(props: PageComponentProps<StoreSafetySpecialistPageFeedbackNM>) {
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
                <AdminExportNMActionButton/>
                <AdminFeedbackNMFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminFeedbackNMItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminFeedbackNMEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageSafetySpecialistFeedbackNM);
