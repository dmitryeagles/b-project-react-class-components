import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import UserDevelopmentPlanAddCourses
    from "../../components/common/userDevelopmentPlan/userDevelopmentPlanAddCourses/userDevelopmentPlanAddCourses";
import UserDevelopmentPlanEditor
    from "../../components/common/userDevelopmentPlan/userDevelopmentPlanEditor/userDevelopmentPlanEditor";
import UserDevelopmentPlanFilters
    from "../../components/common/userDevelopmentPlan/userDevelopmentPlanFilters/userDevelopmentPlanFilters";
import UserDevelopmentPlanItemsList
    from "../../components/common/userDevelopmentPlan/userDevelopmentPlanItemsList/userDevelopmentPlanItemsList";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreCommonPageUserDevelopmentPlan
} from "../../stores/common/pageUserDevelopmentPlan/storeCommonPageUserDevelopmentPlan";

class PageCommonUserDevelopmentPlan extends React.Component<PageComponentProps<StoreCommonPageUserDevelopmentPlan>> {

    constructor(props: PageComponentProps<StoreCommonPageUserDevelopmentPlan>) {
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
                <AdminActionsButtonsDataManagement
                    buttonText={'Добавить план развития'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco />}
                />
                <UserDevelopmentPlanFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <UserDevelopmentPlanItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <UserDevelopmentPlanEditor store={this.props.storePage.storeContentPage} />
                <UserDevelopmentPlanAddCourses store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonUserDevelopmentPlan);
