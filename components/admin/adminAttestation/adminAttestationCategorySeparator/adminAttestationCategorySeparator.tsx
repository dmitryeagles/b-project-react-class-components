import React from "react";
import PlusIco from "../../../../img/svg_component/plus.svg";
import {StandardButton} from "../../../common/standardButton";
import styles from './adminAttestationCategorySeparatorStyle.scss';

interface AdminAttestationCategorySeparatorProps {
    readonly title: string;
    readonly eventClick: () => void;
}

function AdminAttestationCategorySeparator(props: AdminAttestationCategorySeparatorProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.titleContainer}>
                {props.title}
            </div>
            <div className={styles.buttonContainer}>
                <StandardButton
                    text={'Добавить'}
                    iconLeft={<PlusIco/>}
                    eventClick={props.eventClick}
                />
            </div>
        </div>
    );
}

export default React.memo(AdminAttestationCategorySeparator);
