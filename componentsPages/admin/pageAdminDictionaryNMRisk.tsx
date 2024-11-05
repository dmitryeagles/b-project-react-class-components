import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {
    AdminDictionaryNMRisk,
    AdminDictionaryNMRiskEditor,
    AdminDictionaryNMRiskFilters
} from "../../components/admin/directory";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageDictionaryNMRisk} from "../../stores/admin/NMRisk/storeAdminPageDictionaryNMRisk";

const TEXT_ADD_NM_RISK: string = 'Добавить риск NearMiss';

/**
 * Страница "Справочник рисков NearMiss"
 */
class PageAdminDictionaryNMRisk extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryNMRisk>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryNMRisk>) {
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
            return (<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>);
        }

        return (
            <PageContainer>
                <AdminActionsButtonsDataManagement
                    buttonIco={<PlusIco/>}
                    buttonText={TEXT_ADD_NM_RISK}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryNMRiskFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryNMRisk store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryNMRiskEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryNMRisk);
