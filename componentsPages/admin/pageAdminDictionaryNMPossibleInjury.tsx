import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {
    AdminDictionaryNMPossibleInjury,
    AdminDictionaryNMPossibleInjuryEditor,
    AdminDictionaryNMPossibleInjuryFilters
} from "../../components/admin/directory";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionaryNMPossibleInjury
} from "../../stores/admin/NMPossibleInjury/storeAdminPageDictionaryNMPossibleInjury";

const TEXT_ADD_NM_POSSIBLE_INJURY: string = 'Добавить возможную травму NearMiss';

/**
 * Страница "Справочник возможных травм"
 */
class PageAdminDictionaryNMPossibleInjury extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryNMPossibleInjury>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryNMPossibleInjury>) {
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
                    buttonText={TEXT_ADD_NM_POSSIBLE_INJURY}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryNMPossibleInjuryFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryNMPossibleInjury store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryNMPossibleInjuryEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryNMPossibleInjury);
