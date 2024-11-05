import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers";
import {numberRounding} from "../../../../helpers/numberRounding";
import {AdminAttestation} from "../../../../interfaces/api/adminAttestation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentAttestation} from "../../../../stores/admin/attestation/storeAdminPageContentAttestation";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardPanel} from "../../../common/standardPanel";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import styles from './adminAttestationItemsListStyle.scss';

interface ActionButtonsProps {
    readonly attestationUuId: string;
    readonly linkEditItem: string;
    readonly linkUserKPI: string;
    readonly eventDeleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButtons = React.memo((props: ActionButtonsProps) => {
    return (
        <div className={styles.buttonsActionsContainer}>
            <button
                data-id={props.attestationUuId}
                onClick={props.eventDeleteItem}
                className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                {'Удалить'}
            </button>
            <Link
                className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                to={props.linkEditItem}
            >
                {'Подробно'}
            </Link>
            <Link
                className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                to={props.linkUserKPI}
            >
                {'Показатели KPI'}
            </Link>
        </div>
    );
});

interface AttestationItemProps extends ActionButtonsProps {
    readonly attestation: AdminAttestation;
    readonly linkAddNewItem: string;
    readonly eventRecordAttestationResults: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AttestationItem = React.memo((props: AttestationItemProps) => {
    return (
        <StandardPanel className={styles.attestationItemContainer}>
            <div className={styles.attestationItemContentContainer}>
                <div className={styles.attestationName}>
                    {props.attestation.attestationPublicName}
                </div>
                <AdminLabelWithContainerLine
                    label={'Дата начала аттестации:'}
                >
                    {dateFormatForView({
                        date: props.attestation.dateStart,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine
                    label={'Дата окончания аттестации:'}
                >
                    {dateFormatForView({
                        date: props.attestation.dateEnd,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Максимальное количество баллов аттестации:'}>
                    <span>
                        {numberRounding(props.attestation.maxPoints, 5)}
                    </span>
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Определение уровня по тесту:'}>
                    <span>
                        {props.attestation.isDefineLevelByTest ? 'Да' : 'Нет'}
                    </span>
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Баллы в процентах:'}>
                    <span>
                        {props.attestation.isPercent ? 'Да' : 'Нет'}
                    </span>
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine
                    label={'Завод:'}
                >
                    {props.attestation.factoryPublicName}
                </AdminLabelWithContainerLine>

                <div className={styles.copyAttestationContainer}>
                    <Link
                        to={`${props.linkAddNewItem}?copyId=${props.attestation.attestationId}`}
                        className={styles.linkCopyAttestation}
                    >
                        {'Создать новую аттестацию на основе этой'}
                    </Link>
                </div>
            </div>

            <div>
                <ActionButtons
                    attestationUuId={props.attestation.uuid}
                    eventDeleteItem={props.eventDeleteItem}
                    linkEditItem={props.linkEditItem}
                    linkUserKPI={props.linkUserKPI}
                />
                <div
                    data-id={props.attestationUuId}
                    onClick={props.eventRecordAttestationResults}
                    className={styles.buttonFinishAttestation}>
                    {'Завершить аттестацию'}
                </div>
            </div>
        </StandardPanel>
    );
})


function AdminAttestationItemsList(props: SmartComponentProps<StoreAdminPageContentAttestation>) {
    const dataOnCurrentPage: AdminAttestation[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных аттестация для отображения'}/>);
    }

    const attestationElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        attestationElements.push(
            <AttestationItem
                key={dataOnCurrentPage[i].uuid}
                attestationUuId={dataOnCurrentPage[i].uuid}
                attestation={dataOnCurrentPage[i]}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventRecordAttestationResults={props.store.eventRecordAttestationResults}
                linkEditItem={`${props.store.linkEditItem}/${dataOnCurrentPage[i].attestationId}`}
                linkUserKPI={`${props.store.linkUserKPI}/${dataOnCurrentPage[i].attestationId}`}
                linkAddNewItem={props.store.linkAddNewItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {attestationElements}
        </ItemsContainer>
    );
}

export default observer(AdminAttestationItemsList);
