import {observer} from "mobx-react";
import React from "react";
import UploadIco from '../../../../img/svg_component/upload.svg'
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentQuestionsBank
} from "../../../../stores/admin/questionBank/storeAdminPageContentQuestionsBank";
import {
    StoreAdminPopupAddQuestionsFromFile
} from "../../../../stores/admin/questionBank/storeAdminPopupAddQuestionsFromFile";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {StandardButton} from "../../../common/standardButton";
import {AdminPopup} from "../../adminPopup";
import AdminQuestionBankSelectedFile from "../adminQuestionBankSelectedFile/adminQuestionBankSelectedFile";
import styles from './adminPopupAddQuestionsFromFileStyle.scss';

const DropDownSelectDictionaryItem = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <>
            <DropdownSelect
                isClearable={true}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                isSearchable={true}
                eventChange={props.store.eventChangeValue}
                optionsList={props.store.optionsList}
            />
            {
                props.store.errorText ?
                <div className={styles.errorText}>
                    {
                        props.store.errorText
                    }
                </div> : null
            }
        </>
    );
})

const PopupAddQuestionsFromFile = React.memo((props: SmartComponentProps<StoreAdminPopupAddQuestionsFromFile>) => {
    return (
        <AdminPopup
            popupTitle={'Загрузить вопросы из файла'}
            eventClosePopup={props.store.eventClosePopup}
        >
            <div className={styles.titleLine}>{'Укажите завод:'}</div>
            <DropDownSelectDictionaryItem store={props.store.storeDropdownSelectFactory}/>
            <div className={styles.titleLine}>{'Укажите группу вопросов:'}</div>
            <DropDownSelectDictionaryItem store={props.store.storeDropdownSelectGroup}/>

            <div className={styles.startSelectedFileContainer}>
                <AdminQuestionBankSelectedFile store={props.store.storeSelectedFile}/>
            </div>

            <div className={styles.buttonsContainer}>
                <StandardButton
                    eventClick={props.store.eventSaveData}
                    iconLeft={<UploadIco/>}
                    text={'Загрузить'}
                />
            </div>
        </AdminPopup>
    );
});


function AdminPopupAddQuestionsFromFile(props: SmartComponentProps<StoreAdminPageContentQuestionsBank>) {
    if (!props.store.storePopupAddQuestionsFromFile) {
        return null
    }

    return (
        <PopupAddQuestionsFromFile store={props.store.storePopupAddQuestionsFromFile}/>
    );
}

export default observer(AdminPopupAddQuestionsFromFile);
