import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers";
import {ShiftManagerAttestation} from "../../../interfaces/api/shiftManagerAttestation";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreShiftManagerPageContentAttestations
} from "../../../stores/shiftManager/attestations/storeShiftManagerPageContentAttestations";
import {ItemsContainer} from "../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../common/standardPanel";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from './shiftManagerAttestationsStyle.scss';

interface ShiftManagerAttestationItemProps {
    readonly attestation: ShiftManagerAttestation;
    readonly linkToPageKPI: string;
}

const ShiftManagerAttestationItem = React.memo((props: ShiftManagerAttestationItemProps) => {
    const dateStart = dateFormatForView({
        date: props.attestation.attestationDateStart,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    });

    const dateEnd = dateFormatForView({
        date: props.attestation.attestationDateEnd,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    });

    return (
        <StandardPanel
            className={styles.attestationItemContainer}
        >
            <div className={styles.attestationItemContentContainer}>
                <div className={styles.attestationName}>
                    {props.attestation.attestationPublicName}
                </div>

                <LabelWithContainerOnOneLine label={'Завод:'}>
                    {props.attestation.factoryPublicName}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Дата проведения:'}>
                    {`${dateStart} - ${dateEnd}`}
                </LabelWithContainerOnOneLine>
            </div>
            <Link
                className={styles.linkDetail}
                to={`${props.linkToPageKPI}/${props.attestation.attestationId}`}
            >
                {'Показатели KPI'}
            </Link>
        </StandardPanel>
    );

});


function ShiftManagerAttestationsList(props: SmartComponentProps<StoreShiftManagerPageContentAttestations>) {

    const dataOnCurrentPage: ShiftManagerAttestation[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных аттестаций для отображения'}/>)
    }

    const attestationsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        attestationsElements.push(
            <ShiftManagerAttestationItem
                key={dataOnCurrentPage[i].uuid}
                attestation={dataOnCurrentPage[i]}
                linkToPageKPI={props.store.linkToPageKPI}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {attestationsElements}
        </ItemsContainer>
    );
}

export default observer(ShiftManagerAttestationsList);
