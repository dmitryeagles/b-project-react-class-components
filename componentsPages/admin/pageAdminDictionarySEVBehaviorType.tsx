import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {
    AdminDictionarySEVBehaviorType,
    AdminDictionarySEVBehaviorTypeEditor,
    AdminDictionarySEVBehaviorTypeFilters
} from "../../components/admin/directory";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionarySEVBehaviorType
} from "../../stores/admin/SEVBehaviorType/storeAdminPageDictionarySEVBehaviorType";

const TEXT_ADD_SEV_BEHAVIOR_TYPE: string = 'Добавить тип поведения';

/**
 * Страница "Справочник типов поведения"
 */
class PageAdminDictionarySEVBehaviorType extends React.PureComponent<PageComponentProps<StoreAdminPageDictionarySEVBehaviorType>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionarySEVBehaviorType>) {
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
                    buttonText={TEXT_ADD_SEV_BEHAVIOR_TYPE}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionarySEVBehaviorTypeFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionarySEVBehaviorType store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionarySEVBehaviorTypeEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionarySEVBehaviorType);
