import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentInputText} from "../../../stores/common/storeComponentInputText";
import {InputText} from "./index";
import styles from './inputTextSmartStyle.scss';

function InputTextSmart(props: SmartComponentProps<StoreComponentInputText>){
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            placeholder={props.store.placeholder}
        />
    );
}

export default observer(InputTextSmart);
