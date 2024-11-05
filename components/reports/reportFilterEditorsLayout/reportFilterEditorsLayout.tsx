import React from "react";
import {Dictionary} from "../../../interfaces/dictionary";
import styles from './reportFilterEditorsLayoutStyle.scss';

type LayoutType = '1_column' | '2_column' | '3_column';

interface ReportFilterEditorsLayoutProps {
    readonly children: React.ReactNode;
    readonly layout: LayoutType;
}

const layoutDictionaryCssClassNames: Dictionary<string, LayoutType> = {
    '1_column': styles.layoutOneColumn,
    '2_column': styles.layoutTwoColumn,
    '3_column': styles.layoutThreeColumn
}

function ReportFilterEditorsLayout(props: ReportFilterEditorsLayoutProps){

    let cssClass = styles.layoutOneColumn;

    if(layoutDictionaryCssClassNames.hasOwnProperty(props.layout)){
        cssClass =layoutDictionaryCssClassNames[props.layout];
    }

    return(
        <div className={`${styles.componentContainer} ${cssClass}`}>
            {props.children}
        </div>
    );
}

export default React.memo(ReportFilterEditorsLayout);
