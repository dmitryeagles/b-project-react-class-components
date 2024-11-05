import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionarySevObservationTypeCatalog
    from "../../components/admin/directory/adminDictionarySevObservationType/adminDictionarySevObservationTypeCatalog";
import AdminDictionarySevObservationTypeEditor
    from "../../components/admin/directory/adminDictionarySevObservationType/adminDictionarySevObservationTypeEditor/adminDictionarySevObservationTypeEditor";
import AdminDictionarySevObservationTypeFilters
    from "../../components/admin/directory/adminDictionarySevObservationType/adminDictionarySevObservationTypeFilters/adminDictionarySevObservationTypeFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionarySevObservationType
} from "../../stores/admin/SevObservationType/storeAdminPageDictionarySevObservationType";

const TEXT_ADD: string = 'Добавить тип наблюдения';

/**
 * Страница "Степень риска"
 */
class PageAdminDictionarySevObservationType extends React.PureComponent<PageComponentProps<StoreAdminPageDictionarySevObservationType>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionarySevObservationType>) {
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
                <AdminDictionarySevObservationTypeFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionarySevObservationTypeCatalog store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionarySevObservationTypeEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionarySevObservationType);
