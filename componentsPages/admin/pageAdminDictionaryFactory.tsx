import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {
    AdminDictionaryFactory,
    AdminDictionaryFactoryEditor,
    AdminDictionaryFactoryFilters
} from "../../components/admin/directory";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageDictionaryFactory} from "../../stores/admin/factory/storeAdminPageDictionaryFactory";

class PageAdminDictionaryFactory extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryFactory>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryFactory>) {
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
                    buttonText={'Добавить завод'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryFactoryFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <AdminDictionaryFactory store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryFactoryEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryFactory);
