import {observer} from "mobx-react";
import React from "react";
import {StoreComponentDropdownSelect} from "../../../stores/common/storeComponentDropdownSelect";
import {DropdownSelectItem} from "../../common/dropdownSelect/dropdownSelect";
import {ReportFilterEditorDropdown} from "../reportFilterEditorDropdown";

type StoreDropdownSelectType = StoreComponentDropdownSelect<number, any> | StoreComponentDropdownSelect<string, any>;
type StoreSelectedValue = DropdownSelectItem<number, any> | DropdownSelectItem<string, any>;

interface ReportFilterEditorDropdownStepProps {
    readonly label: string;
    readonly helpLabel?: string;
    readonly storeComponentDropdown: StoreDropdownSelectType;
    readonly smoothAppearance?: boolean;
    readonly selectedValue?: StoreSelectedValue;
}

function ReportFilterEditorDropdownStep(props: ReportFilterEditorDropdownStepProps) {
    if (!props.selectedValue) {
        return null;
    }

    return (
        <ReportFilterEditorDropdown
            label={props.label}
            storeComponentDropdown={props.storeComponentDropdown}
            helpLabel={props.helpLabel}
            smoothAppearance={true}
        />
    );
}

export default observer(ReportFilterEditorDropdownStep);
