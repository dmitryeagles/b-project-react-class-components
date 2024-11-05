import {observer} from "mobx-react";
import React from "react";
import {AdminAttestationLevels} from "../../../../interfaces/api/adminAttestation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminAttestationLevelsListStyle.scss';

interface LevelItemProps extends AdminActionButtonsProps {
    attestationLevel: AdminAttestationLevels;
}

const AttestationLevelItem = React.memo((props:LevelItemProps )=>{
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Уровень:'}
            >
                {props.attestationLevel.publicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Приоритет уровня:'}
            >
                {props.attestationLevel.levelPriority}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Баллов минимально:'}
            >
                {props.attestationLevel.lowerScore}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Баллов максимально:'}
            >
                {props.attestationLevel.upperScore}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});


function AdminAttestationLevelsList(props: SmartComponentProps<StoreAdminEditAttestation>){

    const attestationLevelsList: AdminAttestationLevels[] = props.store.storeAttestationLevels.itemsList;

    if(!attestationLevelsList.length) {
        return(<StubEmptyData emptyDataText={'Отсутствуют доступные уровни для отображения'}/>)
    }

    const attestationsElements: JSX.Element[] = [];

    for(let i = 0; i< attestationLevelsList.length; ++i) {
        attestationsElements.push(
            <AttestationLevelItem
                key={attestationLevelsList[i].uuid}
                itemId={attestationLevelsList[i].uuid}
                attestationLevel={attestationLevelsList[i]}
                eventStartEdit={props.store.eventStartEditAttestationLevel}
                eventDeleteItem={props.store.eventStartDeleteAttestationLevel}
            />
        );
    }

    return (
        <div className={styles.componentContainer}>
            {attestationsElements}
        </div>
    );
}

export default observer(AdminAttestationLevelsList);
