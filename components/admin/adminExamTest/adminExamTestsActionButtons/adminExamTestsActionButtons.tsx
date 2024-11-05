import React from "react";
import PlusIco from "../../../../img/svg_component/plus.svg";
import {LinkAsButton} from "../../../common/linkAsButton";
import styles from "./adminExamTestsActionButtonsStyle.scss";

interface AdminExamTestsActionButtonsProps {
    readonly linkAddNewExamTest: string;
}

function AdminExamTestsActionButtons(props: AdminExamTestsActionButtonsProps) {
    return(
        <div className={styles.componentContainer}>
            <LinkAsButton
                iconLeft={<PlusIco/>}
                text={'Добавить тест'}
                href={props.linkAddNewExamTest}
            />
        </div>
    );
}

export default React.memo(AdminExamTestsActionButtons);
