import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentInputNumber} from "../../../stores/common/storeComponentInputNumber";
import {InputNumeric} from "./index";

function InputNumericSmart(props: SmartComponentProps<StoreComponentInputNumber>) {
    return (
        <InputNumeric
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            max={props.store.maxValue}
            min={props.store.minValue}
            value={props.store.value}
            placeholder={props.store.placeholder}
            precision={props.store.precision}
        />
    );
}

export default observer(InputNumericSmart);
