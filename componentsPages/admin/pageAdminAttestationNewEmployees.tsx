import {observer} from "mobx-react";
import React from "react";
import {
    AdminAttestationNewEmployeesList
} from "../../components/admin/adminAttestationNewEmployees/adminAttestationNewEmployees";
import AdminAttestationNewEmployeesEditor
    from "../../components/admin/adminAttestationNewEmployees/adminAttestationNewEmployeesEditor/adminAttestationNewEmployeesEditor";
import AdminAttestationNewEmployeesFilters
    from "../../components/admin/adminAttestationNewEmployees/adminAttestationNewEmployeesFilters/adminAttestationNewEmployeesFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StudentActionsButtonsDataManagement} from "../../components/student/studentActionsButtonsDataManagement";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageAttestationNewEmployee
} from "../../stores/admin/attestationNewEmployee/storeAdminPageAttestationNewEmployee";

class PageAdminAttestationNewEmployees extends React.PureComponent<PageComponentProps<StoreAdminPageAttestationNewEmployee>> {
    constructor(props: PageComponentProps<StoreAdminPageAttestationNewEmployee>) {
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

        return (
            <PageContainer>
                <StudentActionsButtonsDataManagement
                    buttonText={'Назначить тест'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco />}
                />
                <AdminAttestationNewEmployeesFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminAttestationNewEmployeesList store={this.props.storePage.storeContentPage} />
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <AdminAttestationNewEmployeesEditor store={this.props.storePage.storeContentPage} />
            </PageContainer>
        );
    }
}

export default observer(PageAdminAttestationNewEmployees);
