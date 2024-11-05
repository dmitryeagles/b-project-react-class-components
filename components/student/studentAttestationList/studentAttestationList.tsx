import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers";
import {StudentAttestationInfo} from "../../../interfaces/api/userAvailableExamTests";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreStudentPageContentAttestationList
} from "../../../stores/student/attestationList/storeStudentPageContentAttestationList";
import {ItemsContainer} from "../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../common/standardPanel";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from "./studentAttestationListStyle.scss";

interface StudentAttestationListItemProps {
    readonly attestation: StudentAttestationInfo;
    readonly linkAttestations: string;
}

const StudentAttestationListItem = React.memo((props: StudentAttestationListItemProps) => {
    const dateStart: string = dateFormatForView({
        date: props.attestation.attestationDateStart,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    });
    const dateEnd: string = dateFormatForView({
        date: props.attestation.attestationDateEnd,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    });

    return (
        <StandardPanel className={styles.attestationItemContainer}>
            <div className={styles.attestationItemContentContainer}>
                <div className={styles.attestationName}>
                    {props.attestation.attestationName}
                </div>
                <LabelWithContainerOnOneLine label={'Дата аттестации:'}>
                    <span> {`${dateStart} - ${dateEnd}`}</span>
                </LabelWithContainerOnOneLine>
            </div>

            {props.attestation.isAttestationFinish ?

                <span
                    className={`${styles.attestationBtnItem} ${styles.attestationBtnNotAvailable}`}
                >
                    {'Аттестация завершена'}
                </span> : <Link
                    className={`${styles.attestationBtnItem} ${styles.linkShowAttestationTests}`}
                    to={`${props.linkAttestations}/${props.attestation.attestationId}`}
                >
                    {'Пройти аттестацию'}
                </Link>
            }
        </StandardPanel>
    );
});

function StudentAttestationList(props: SmartComponentProps<StoreStudentPageContentAttestationList>) {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData
                emptyDataText={'Отсутствуют доступные тесты'}
            />
        )
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {
                dataOnCurrentPage.map((item) =>
                    <StudentAttestationListItem
                        key={item.uuid}
                        attestation={item}
                        linkAttestations={props.store.linkAttestations}
                    />)
            }
        </ItemsContainer>
    );
}

export default observer(StudentAttestationList);
