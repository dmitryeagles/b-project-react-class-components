import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentInputText} from "../../../stores/common/storeComponentInputText";
import TextEditorMultiline from "./textEditorMultiline";
import styles from "./textEditorMultilineSmartStyle.scss";

function TextEditorMultilineSmart(props: SmartComponentProps<StoreComponentInputText>){
    return (
        <TextEditorMultiline
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
}

export default observer(TextEditorMultilineSmart);
