import React from "react";
import PlusIco from "../../../../img/svg_component/plus.svg";
import {LinkAsButton} from "../../../common/linkAsButton";
import styles from './adminAttestationActionButtonsStyle.scss';

interface AdminAttestationActionButtonsProps {
    readonly linkAddNewAttestation: string;
}

function AdminAttestationActionButtons(props: AdminAttestationActionButtonsProps) {
    return(
        <div className={styles.componentContainer}>
            <LinkAsButton
                iconLeft={<PlusIco/>}
                text={'Добавить аттестацию'}
                href={props.linkAddNewAttestation}
            />
        </div>
    );
}

export default React.memo(AdminAttestationActionButtons);
