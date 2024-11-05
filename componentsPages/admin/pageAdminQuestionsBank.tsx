import {observer} from "mobx-react";
import React from "react";
import {
    AdminPopupAddQuestionsFromFile,
    AdminQuestionBankButtonsDataManager,
    AdminQuestionBankFilters,
    TestQuestionsListEditMode,
    TestQuestionsListReadMode
} from "../../components/admin/adminQuestionBank";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {SmartComponentProps} from "../../interfaces/smartComponentProps";
import {StoreAdminPageContentQuestionsBank} from "../../stores/admin/questionBank/storeAdminPageContentQuestionsBank";
import {StoreAdminPageQuestionsBank} from "../../stores/admin/questionBank/storeAdminPageQuestionsBank";

/**
 * Список вопросов в режиме только для чтения
 */
const QuestionsReadOnlyMode = React.memo((props: SmartComponentProps<StoreAdminPageContentQuestionsBank>) => {
    return (
        <div>
            <AdminQuestionBankButtonsDataManager
                eventStartAddNewItem={props.store.eventStartAddNewItem}
                eventStartAddQuestionsFromFile={props.store.eventShowPopupAddQuestionsFromFile}
            />
            <AdminQuestionBankFilters store={props.store.storeFilters}/>
            <FormatViewItems store={props.store.storeSelectViewCatalog}/>
            <TestQuestionsListReadMode store={props.store}/>
            <Paginate store={props.store.storeDataPagination}/>
        </div>
    );
});

/**
 * Переключатель режимов вопросов
 */
const SwitchQuestionMode = observer((props: SmartComponentProps<StoreAdminPageContentQuestionsBank>) => {
    if (props.store.storeEditData) {
        return (<TestQuestionsListEditMode store={props.store.storeEditData}/>);
    }

    return (
        <>
            <QuestionsReadOnlyMode store={props.store}/>
            <AdminPopupAddQuestionsFromFile store={props.store}/>
        </>
    );
});

class PageAdminQuestionsBank extends React.PureComponent<PageComponentProps<StoreAdminPageQuestionsBank>> {
    constructor(props: PageComponentProps<StoreAdminPageQuestionsBank>) {
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
                <SwitchQuestionMode store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminQuestionsBank);
