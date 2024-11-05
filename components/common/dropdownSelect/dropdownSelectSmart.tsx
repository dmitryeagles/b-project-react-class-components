import { observer } from "mobx-react";
import React from "react";
import { SmartComponentProps } from "../../../interfaces/smartComponentProps";
import { StoreComponentDropdownSelect } from "../../../stores/common/storeComponentDropdownSelect";
import DropdownSelect from "./dropdownSelect";
import styles from './dropdownSelectSmartStyle.scss';

function DropdownSelectSmart(props: SmartComponentProps<StoreComponentDropdownSelect<any>>) {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={props.store.isClearable}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {
                props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null
            }
        </>
    );
}

export default observer(DropdownSelectSmart);
