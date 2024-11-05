import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionarySevObservationKindCatalog
    from "../../components/admin/directory/adminDictionarySevObservationKind/adminDictionarySevObservationKindCatalog";
import AdminDictionarySevObservationKindEditor
    from "../../components/admin/directory/adminDictionarySevObservationKind/adminDictionarySevObservationKindEditor/adminDictionarySevObservationKindEditor";
import AdminDictionarySevObservationKindFilters
    from "../../components/admin/directory/adminDictionarySevObservationKind/adminDictionarySevObservationKindFilters/adminDictionarySevObservationKindFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionarySevObservationKind
} from "../../stores/admin/SevObservationKind/storeAdminPageDictionaryKindObservationType";

const TEXT_ADD: string = 'Добавить тип наблюдения';

/**
 * Страница "Степень риска"
 */
class PageAdminDictionarySevObservationKind extends React.PureComponent<PageComponentProps<StoreAdminPageDictionarySevObservationKind>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionarySevObservationKind>) {
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
                    buttonText={TEXT_ADD}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionarySevObservationKindFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionarySevObservationKindCatalog store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionarySevObservationKindEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionarySevObservationKind);
