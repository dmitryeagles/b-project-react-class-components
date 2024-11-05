import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentClearAttempts
} from "../../../../stores/admin/clearAttempts/storeAdminPageContentClearAttempts";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {InputNumeric} from "../../../common/inputNumeric";
import {StandardButton} from "../../../common/standardButton";
import {AdminFilterEditorDropdown} from "../adminFilterEditorDropdown";
import styles from './adminClearAttempsAddAttemptsToUserStyle.scss';

interface EditorInputNumberProps extends SmartComponentProps<StoreComponentInputNumber> {
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const EditorInputNumber = observer((props: EditorInputNumberProps) =>
    <InputNumeric
        className={styles.inputCell}
        errorText={props.store.errorText}
        eventChange={props.store.eventChangeValue}
        value={props.store.value}
        min={props.store.minValue}
        max={props.store.maxValue}
    />
);

function AdminClearAttempsAddAttemptsToUser(props: SmartComponentProps<StoreAdminPageContentClearAttempts>) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.btnContainerItemDescription}>
                <p>{'Добавить попытку прохождения аттестации'}</p>
                <div className={styles.dropdownTestAndUserContainer}>
                    <AdminFilterEditorDropdown
                        storeComponentDropdown={props.store.storeDropdownSelectAttestationForAdd}
                        helpLabel={'Шаг 1: Выберите аттестацию'}
                    />
                    { !props.store.storeDropdownSelectAttestationForAdd.selectedValue ? null :
                    <AdminFilterEditorDropdown
                        storeComponentDropdown={props.store.storeDropdownSelectUserForAdd}
                        helpLabel={'Шаг 2: Выберите сотрудника'}
                    />
                    }
                    { !props.store.storeDropdownSelectUserForAdd.selectedValue ? null :
                    <AdminFilterEditorDropdown
                        storeComponentDropdown={props.store.storeDropdownSelectTestForAdd}
                        helpLabel={'Шаг 3: Выберите тест'}
                    />
                    }
                    { !props.store.storeDropdownSelectTestForAdd.selectedValue ? null :
                    <EditorInputNumber
                        store={props.store.storeEditAttemptCount}
                        onKeyPress={props.store.eventOnKeyPress}
                    />
                    }
                    {!props.store.storeEditAttemptCount.value ? null :
                    <StandardButton
                        className={styles.iconBtn}
                        eventClick={props.store.eventAddAttemptsToUser}
                        text={'Добавить'}
                    />
                    }
                </div>
            </div>
        </div>
    );
}

export default observer(AdminClearAttempsAddAttemptsToUser);
