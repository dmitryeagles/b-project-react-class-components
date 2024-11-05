import {observer} from "mobx-react";
import React from "react";
import {Navigate} from "react-router-dom";
import {AuthorizationButtons} from "../../components/authorization/authorizationButtons";
import {AuthorizationFormContainer} from "../../components/authorization/authorizationFormContainer";
import {AuthorizationInput} from "../../components/authorization/authorizationInput";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {SmartComponentProps} from "../../interfaces/smartComponentProps";
import {StoreAuthResetPasswordPage} from "../../stores/authorization/resetPassword/storeAuthResetPasswordPage";
import {StoreComponentInputText} from "../../stores/common/storeComponentInputText";

const InputAuthLogin = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <AuthorizationInput
            ico={'user'}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            inputType={'text'}
            placeholder={props.store.placeholder}
            textError={props.store.errorText}
        />
    );
});

const InputAuthNewPassword = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <AuthorizationInput
            ico={'lock'}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            inputType={'password'}
            placeholder={props.store.placeholder}
            textError={props.store.errorText}
        />
    );
});

const InputAuthRepeatNewPassword = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <AuthorizationInput
            ico={'lock'}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            inputType={'password'}
            placeholder={props.store.placeholder}
            textError={props.store.errorText}
        />
    );
});

class PageResetPassword extends React.Component<PageComponentProps<StoreAuthResetPasswordPage>> {

    constructor(props: PageComponentProps<StoreAuthResetPasswordPage>) {
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
                titleTextAuthorizationForm={'Сброс пароля'}
            >
                <InputAuthLogin store={this.props.storePage.storeContentPage.storeLogin}/>
                <InputAuthNewPassword store={this.props.storePage.storeContentPage.storeNewPassword}/>
                <InputAuthRepeatNewPassword store={this.props.storePage.storeContentPage.storeRepeatNewPassword}/>
                <AuthorizationButtons
                    buttonOk={{
                        text: 'Изменить пароль',
                        eventClick: this.props.storePage.storeContentPage.eventResetPasswordInSystem
                    }}
                    buttonCancel={{
                        text: 'Отмена',
                        link: this.props.storePage.storeRouter.getPagePath('authLogin')
                    }}
                />
            </AuthorizationFormContainer>
        );
    }
}

export default observer(PageResetPassword);
