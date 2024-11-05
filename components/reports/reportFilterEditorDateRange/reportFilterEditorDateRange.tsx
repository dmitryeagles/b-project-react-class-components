import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentDateRangePicker} from "../../../stores/common/storeComponentDateRangePicker";
import {DateRangePicker} from "../../common/dateRangePicker";
import styles from "./reportFilterEditorDateRangeStyle.scss";

const ReportDateRangePicker = observer((props: SmartComponentProps<StoreComponentDateRangePicker>) => {
    return (
        <>
            <DateRangePicker
                isClearable={props.store.isClearable}
                selectedDateStart={props.store.dateRange.dateStart}
                selectedDateEnd={props.store.dateRange.dateEnd}
                eventChangeDateStart={props.store.eventChangeDateStart}
                eventChangeDateEnd={props.store.eventChangeDateEnd}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorText}>
                        {props.store.errorText}
                    </div> : null
            }
        </>
    );
})

//region ReportFilterEditorDateRange
interface ReportFilterEditorDateRangeProps {
    readonly label: string;
    readonly storeComponentDateRangePicker: StoreComponentDateRangePicker;
}

function ReportFilterEditorDateRange(props: ReportFilterEditorDateRangeProps) {
    return (
        <div>
            <div className={styles.filterLabel}>{props.label}</div>
            <ReportDateRangePicker store={props.storeComponentDateRangePicker}/>
        </div>
    );
}

//endregion

export default React.memo(ReportFilterEditorDateRange);
