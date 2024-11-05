import {observer} from "mobx-react";
import React from "react";
import {ButtonsContainer} from "../../components/common/buttonsContainer";
import {LinkAsButton} from "../../components/common/linkAsButton";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {
    StudentTestExam,
    StudentTestVerificationInProgress,
    TestExamLoading
} from "../../components/student/studentPassingTest";
import {StudentTestAnimationNotFound} from "../../components/student/studentPassingTest/studentTestAnimationNotFound";
import {StudentTestResult} from "../../components/student/studentTestResult";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {SmartComponentProps} from "../../interfaces/smartComponentProps";
import {StoreAdminPageViewExamTest} from "../../stores/admin/viewExamTest/storeAdminPageViewExamTest";
import {StorePassingExamTestPageContent} from "../../stores/passingExamTest/storePassingExamTestPageContent";
import {StoreStudentPagePassingExamTest} from "../../stores/student/passingExamTest/storeStudentPagePassingExamTest";


const ContentSwitcher = observer((props: SmartComponentProps<StorePassingExamTestPageContent>) => {

    if (props.store.storePassingTest) {
        return (<StudentTestExam store={props.store.storePassingTest}/>);
    }

    if (props.store.isTestVerificationInProgress) {
        return (<StudentTestVerificationInProgress/>);
    }

    if (props.store.storeTestResult) {
        return (<StudentTestResult store={props.store.storeTestResult}/>);
    }

    if (props.store.errorTextTestNotFound) {
        return (<StudentTestAnimationNotFound notFoundText={props.store.errorTextTestNotFound}/>);
    }

    return (<TestExamLoading loadingText={'Формирование теста'}/>);
});

type StorePage = StoreAdminPageViewExamTest | StoreStudentPagePassingExamTest;

class PagePassingExamTest extends React.PureComponent<PageComponentProps<StorePage>> {
    constructor(props: PageComponentProps<StorePage>) {
        super(props);
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    render() {

        if (!this.props.storePage.storeContentPage) {
            return null
        }

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (
                <div>
                    <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
                    <ButtonsContainer>
                        <LinkAsButton
                            text={'Вернуться к списку тестов'}
                            type={'ok'}
                            href={this.props.storePage.storeContentPage.linkBack}
                        />
                    </ButtonsContainer>
                </div>
            );
        }

        return (
            <div>
                <ContentSwitcher store={this.props.storePage.storeContentPage}/>
            </div>
        );
    }
}

export default observer(PagePassingExamTest);
