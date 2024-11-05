import {observer} from "mobx-react";
import React from "react";
import {Navigate} from "react-router-dom";
import {AuthorizationButtons} from "../../components/authorization/authorizationButtons";
import {AuthorizationFormContainer} from "../../components/authorization/authorizationFormContainer";
import {AuthorizationInput} from "../../components/authorization/authorizationInput";
import {ForgotPassword} from "../../components/authorization/forgotPassword";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {SmartComponentProps} from "../../interfaces/smartComponentProps";
import {StoreAuthLoginPage} from "../../stores/authorization/login/storeAuthLoginPage";
import {StoreComponentInputText} from "../../stores/common/storeComponentInputText";

const InputAuthLogin = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <AuthorizationInput
            ico={'user'}
            defaultValue={props.store.value}
            eventChange={props.store.eventChangeValue}
            inputType={'text'}
            placeholder={props.store.placeholder}
            textError={props.store.errorText}
            isAutoComplete
        />
    );
});

const InputAuthPassword = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <AuthorizationInput
            ico={'lock'}
            defaultValue={props.store.value}
            eventChange={props.store.eventChangeValue}
            inputType={'password'}
            placeholder={props.store.placeholder}
            textError={props.store.errorText}
            isAutoComplete
        />
    );
});

class PageLogin extends React.Component<PageComponentProps<StoreAuthLoginPage>> {

    constructor(props: PageComponentProps<StoreAuthLoginPage>) {
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

        if(this.props.storePage.storeContentPage.linkRedirectToPage){
            return (<Navigate to={this.props.storePage.storeContentPage.linkRedirectToPage} replace={true}/>)
        }

        return (
            <AuthorizationFormContainer
                titleTextAuthorizationForm={'Авторизация'}
            >
                <InputAuthLogin store={this.props.storePage.storeContentPage.storeInputEmail}/>
                <InputAuthPassword store={this.props.storePage.storeContentPage.storeInputPassword}/>
                <AuthorizationButtons
                    buttonOk={{
                        text: 'Войти',
                        eventClick: this.props.storePage.storeContentPage.eventLoginItSystem
                    }}
                    buttonCancel={{
                        text: 'Гостевой доступ',
                        link: this.props.storePage.storeContentPage.linkToGuestHomePage,
                        isRealLink: true
                    }}
                />
                <ForgotPassword
                    linkPageForgotPassword={this.props.storePage.storeRouter.getPagePath('authResetPassword')}
                />
            </AuthorizationFormContainer>
        );
    }
}

export default observer(PageLogin);
