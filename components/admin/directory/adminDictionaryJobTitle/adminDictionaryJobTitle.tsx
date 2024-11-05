import {observer} from "mobx-react";
import React from "react";
import {DictionaryJobTitle} from "../../../../interfaces/api/dictionaryJobTitle";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryJobTitle
} from "../../../../stores/admin/jobTitle/storeAdminPageContentDictionaryJobTitle";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminDictionaryJobTitleStyle.scss';

interface JobTitleItemProps extends AdminActionButtonsProps {
    jobTitle: DictionaryJobTitle;
}

const JobTitleItem = React.memo((props:JobTitleItemProps )=>{
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Должность:'}
                classNameLabelIco={styles.icoBriefcase}
            >
                {props.jobTitle.jobTitlePublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Завод:'}
                classNameLabelIco={styles.icoFactory}
            >
                {props.jobTitle.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryJobTitle(props: SmartComponentProps<StoreAdminPageContentDictionaryJobTitle>) {

    const dataOnCurrentPage: DictionaryJobTitle[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют должности для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <JobTitleItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                jobTitle={dataOnCurrentPage[i]}
                eventStartEdit={props.store.eventStartChangeItem}
                eventDeleteItem={props.store.eventStartDeleteItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {dictionaryListElements}
        </ItemsContainer>
    );
}

export default observer(AdminDictionaryJobTitle);
