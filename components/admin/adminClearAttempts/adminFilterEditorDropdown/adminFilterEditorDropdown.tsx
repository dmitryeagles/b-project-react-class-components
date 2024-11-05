import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {DropdownSelect} from "../../../common/dropdownSelect";
import styles from "./adminFilterEditorDropdownStyle.scss";

type StoreDropdownSelectType = StoreComponentDropdownSelect<number, any> | StoreComponentDropdownSelect<string, any>;

const AdminDropdownSelect = observer((props: SmartComponentProps<StoreDropdownSelectType>) => {
    return (
        <>
            <DropdownSelect
                isClearable={props.store.isClearable}
                optionsList={props.store.optionsList}
                eventChange={props.store.eventChangeValue}
                selectedValue={props.store.selectedValue}
                placeholder={props.store.placeholder}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorText}>
                        {props.store.errorText}
                    </div> : null
            }
        </>
    );
});

//region ReportFilterEditorDropdown
interface ReportFilterEditorDropdownProps {
    readonly label?: string;
    readonly helpLabel?: string;
    readonly storeComponentDropdown: StoreDropdownSelectType;
    readonly smoothAppearance?: boolean;
}

function AdminFilterEditorDropdown(props: ReportFilterEditorDropdownProps) {
    return (
        <div className={props.smoothAppearance ? styles.smoothEditor : undefined}>
            <div className={styles.filterLabel}>{props.label}</div>
            <AdminDropdownSelect store={props.storeComponentDropdown}/>
            <div className={styles.helpLabel}>{props.helpLabel}</div>
        </div>
    );
}

//endregion

export default React.memo(AdminFilterEditorDropdown);
