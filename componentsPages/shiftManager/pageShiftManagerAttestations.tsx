import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ShiftManagerAttestationsList} from "../../components/shiftManager/shiftManagerAttestations";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreShiftManagerPageAttestations
} from "../../stores/shiftManager/attestations/storeShiftManagerPageAttestations";

class PageShiftManagerAttestations extends React.Component<PageComponentProps<StoreShiftManagerPageAttestations>> {

    constructor(props: PageComponentProps<StoreShiftManagerPageAttestations>) {
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

        if(this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>);
        }

        return (
            <PageContainer>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ShiftManagerAttestationsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
            </PageContainer>
        );
    }
}

export default observer(PageShiftManagerAttestations);
