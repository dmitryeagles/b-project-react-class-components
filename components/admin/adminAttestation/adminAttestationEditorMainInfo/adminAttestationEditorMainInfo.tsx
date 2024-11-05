import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {numberRounding} from "../../../../helpers/numberRounding";
import {AdminAttestationDataMainInfo} from "../../../../interfaces/api/adminAttestation";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminAttestationEditorMainInfo
} from "../../../../stores/admin/attestation/adminAttestationStoresEditors/storeAdminAttestationEditorMainInfo";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentDateRangePicker} from "../../../../stores/common/storeComponentDateRangePicker";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {ButtonsContainer} from "../../../common/buttonsContainer";
import {CheckboxButton} from "../../../common/checkboxButton";
import {DateRangePicker} from "../../../common/dateRangePicker";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import {InputText} from "../../../common/inputText";
import {StandardButton} from "../../../common/standardButton";
import {StandardPanel} from "../../../common/standardPanel";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import styles from './adminAttestationEditorMainInfoStyle.scss';

interface AttestationMainInfoReadOnlyModeProps {
    readonly attestationMainInfo: AdminAttestationDataMainInfo;
    readonly eventStartEdit: () => void;
}

const EditorAttestationName = observer((props: SmartComponentProps<StoreComponentInputText>) =>
    <InputText
        className={styles.inputText}
        value={props.store.value}
        eventChange={props.store.eventChangeValue}
        errorText={props.store.errorText}
    />
);

const EditorFactory = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) =>
    <div>
        <DropdownSelect
            selectedValue={props.store.selectedValue}
            optionsList={props.store.optionsList}
            placeholder={props.store.placeholder}
            isClearable={false}
            eventChange={props.store.eventChangeValue}
        />
        {
            props.store.errorText ?
                <div className={styles.errorText}>
                    {props.store.errorText}
                </div>
                : null
        }
    </div>
);

const EditorPointsForAttestation = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            errorText={props.store.errorText}
            value={props.store.value}
            min={props.store.minValue}
            max={props.store.maxValue}
            eventChange={props.store.eventChangeValue}
        />
    );
});

const EditorAttestationDate = observer((props: SmartComponentProps<StoreComponentDateRangePicker>) =>
    <div>
        <DateRangePicker
            classNameInputDateWrapper={styles.inputDateWrapper}
            isClearable={props.store.isClearable}
            eventChangeDateEnd={props.store.eventChangeDateEnd}
            eventChangeDateStart={props.store.eventChangeDateStart}
            placeholderTextStart={'От'}
            placeholderTextEnd={'До'}
            selectedDateStart={props.store.dateRange.dateStart}
            selectedDateEnd={props.store.dateRange.dateEnd}
        />
        {
            props.store.errorText ?
                <div className={styles.errorText}>
                    {props.store.errorText}
                </div>
                : null
        }
    </div>
);

const EditorCheckLvlByTest = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Определение уровня по тесту'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);

const EditorIsPercent = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Баллы в процентах'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);

interface AttestationMainInfoEditModeProps {
    readonly storeAttestationEditorMainInfo: StoreAdminAttestationEditorMainInfo;
    readonly storeIsNewItem: StoreBooleanFlag;
}

const AttestationMainInfoEditMode = observer((props: AttestationMainInfoEditModeProps) => {
    return (
        <StandardPanel>
            <AdminLabelWithContainerTwoLine label={'Название аттестации:'}>
                <EditorAttestationName store={props.storeAttestationEditorMainInfo.storeEditorAttestationName}/>
            </AdminLabelWithContainerTwoLine>

            {
                props.storeIsNewItem.status ?
                    <AdminLabelWithContainerTwoLine label={'Завод:'}>
                        <EditorFactory store={props.storeAttestationEditorMainInfo.storeEditorFactory}/>
                    </AdminLabelWithContainerTwoLine> : null
            }
            <AdminLabelWithContainerTwoLine label={'Дата аттестации:'}>
                <EditorAttestationDate store={props.storeAttestationEditorMainInfo.storeEditorAttestationDate}/>
            </AdminLabelWithContainerTwoLine>

            {/* <AdminLabelWithContainerTwoLine label={'Проходной балл для теста:'}>
                <EditorPointsForAttestation
                    store={props.storeAttestationEditorMainInfo.storeEditorPointsForAttestation}/>
            </AdminLabelWithContainerTwoLine> */}

            {
                props.storeIsNewItem.status ?
                    <EditorCheckLvlByTest store={props.storeAttestationEditorMainInfo.storeEditorCheckLvlByTest}/>
                    : null
            }

            <div className={styles.editorPercentWrapper}>
                <EditorIsPercent store={props.storeAttestationEditorMainInfo.storeEditorIsPercent}/>
            </div>

            <div className={styles.buttonsContainer}>
                {
                    !props.storeIsNewItem.status ?
                        <StandardButton
                            text={'Отмена'}
                            type={'cancel'}
                            eventClick={props.storeAttestationEditorMainInfo.eventCancelEditData}
                        /> : null
                }
                <StandardButton
                    text={'Сохранить'}
                    type={'primary'}
                    eventClick={props.storeAttestationEditorMainInfo.eventSaveEditData}
                />
            </div>
        </StandardPanel>
    );
});

const AttestationMainInfoReadOnlyMode = React.memo((props: AttestationMainInfoReadOnlyModeProps) => {
    return (
        <StandardPanel>
            <div className={styles.attestationPublicName}>{props.attestationMainInfo.attestationPublicName}</div>

            <AdminLabelWithContainerLine label={'Завод:'}>
                <span>
                    {props.attestationMainInfo.factoryPublicName}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Дата начала аттестации:'}>
                <span>
                    {dateFormatForView({
                        date: props.attestationMainInfo.dateStart,
                        format: 'DD.MM.YYYY'
                    })}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Дата окончания аттестации:'}>
                <span>
                    {dateFormatForView({
                        date: props.attestationMainInfo.dateEnd,
                        format: 'DD.MM.YYYY'
                    })}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Максимальное количество баллов аттестации:'}>
                <span>
                    {numberRounding(props.attestationMainInfo.maxPoints, 5)}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Определение уровня по тесту:'}>
                <span>
                    {props.attestationMainInfo.isDefineLevelByTest ? 'Да' : 'Нет'}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Баллы в процентах:'}>
                <span>
                    {props.attestationMainInfo.isPercent ? 'Да' : 'Нет'}
                </span>
            </AdminLabelWithContainerLine>


            <ButtonsContainer buttonsAlign={'right'}>
                <StandardButton
                    text={'Изменить'}
                    eventClick={props.eventStartEdit}
                />
            </ButtonsContainer>
        </StandardPanel>
    );
})

function AdminAttestationEditorMainInfo(props: SmartComponentProps<StoreAdminEditAttestation>) {

    if (props.store.storeAttestationMainInfo.storeEditorAttestationMainInfo) {
        return (
            <AttestationMainInfoEditMode
                storeAttestationEditorMainInfo={props.store.storeAttestationMainInfo.storeEditorAttestationMainInfo}
                storeIsNewItem={props.store.storeIsSavedDataOnServer}
            />
        );
    }

    return (
        <AttestationMainInfoReadOnlyMode
            attestationMainInfo={props.store.storeAttestationMainInfo.attestationMainInfo}
            eventStartEdit={props.store.eventStartEditAttestationMainInfo}
        />
    );
}

export default observer(AdminAttestationEditorMainInfo);
