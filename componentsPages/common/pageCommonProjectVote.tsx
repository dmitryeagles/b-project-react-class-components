import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ProjectsForVotingEditor} from "../../components/project/projectsForVoting/projectsForVotingEditor";
import {ProjectsForVotingFilters} from "../../components/project/projectsForVoting/projectsForVotingFilters";
import {ProjectsForVotingHistory} from "../../components/project/projectsForVoting/projectsForVotingHistory";
import {ProjectsForVotingList} from "../../components/project/projectsForVoting/projectsForVotingList";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageProjectVote} from "../../stores/common/pageProjecVote/storeCommonPageProjectVote";


class PageCommonProjectVote extends React.Component<PageComponentProps<StoreCommonPageProjectVote>> {

    constructor(props: PageComponentProps<StoreCommonPageProjectVote>) {
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
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <ProjectsForVotingFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectsForVotingList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <ProjectsForVotingEditor store={this.props.storePage.storeContentPage}/>
                <ProjectsForVotingHistory store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonProjectVote);
