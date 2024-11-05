import React from "react";
import {Link} from "react-router-dom";
import {SitePageInfo} from "../../../interfaces/sitePageInfo";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {RouterPagesKeysAdmin} from "../../../staticData/routerPages/routerPagesAdmin";
import {StoreAdminPageHome} from "../../../stores/admin/home/storeAdminPageHome";
import styles from './adminMainCategoryListStyle.scss';

const cssClassImages: { [imageName in RouterPagesKeysAdmin | string]: string } = {
    adminUsers: styles.imagePeoples,
    adminAttestationList: styles.imageUndrawScrumBoard,
    adminTestList: styles.imageEducator,
    adminQuestionsBank: styles.imageQuestions,
    adminChoiceReport: styles.imageCertificate,
    adminDictionaryChoice: styles.imageBookshelves,
    adminTemplateSEV: styles.imageBuildingBlocks,
    adminFeedbackSEV: styles.imageBeginChatColor,
    adminAttestationNewEmployees: styles.imageAttestationNewEmployees,
    adminTemplateNM: styles.imageBuildingBlocks,
    adminFeedbackNM: styles.imageBeginChatColor,
    adminProjectsMini5s: styles.imageProject,
    adminProjectsLEAN: styles.imageProject,
    adminProjectRegistry: styles.imageProjectRegistry,
    adminResourceAlignment: styles.imageResourceAlignment,
    adminCreateNews: styles.imageNotebook,
}


//region Плитка ссылка
export interface AdminMainCategoryItem {
    readonly sitePage: SitePageInfo;
}

function MainCategoryItem(props: AdminMainCategoryItem) {

    let cssClassItemImage: string = styles.imageUnknown;

    if (cssClassImages.hasOwnProperty(props.sitePage.pageKey)) {
        cssClassItemImage = cssClassImages[props.sitePage.pageKey];
    }

    return (
        <Link to={props.sitePage.fullPath} className={styles.mainCategoryItem}>
            <div className={`${styles.imageContainer} ${cssClassItemImage}`}/>
            <div className={styles.textContainer}>{props.sitePage.pagePublicName}</div>
        </Link>
    );
}

//endregion

interface AdminMainCategoryGroupListProps {
    readonly groupTitle: string;
    readonly pagesList: readonly SitePageInfo[];
}

function AdminMainCategoryGroupList(props: AdminMainCategoryGroupListProps) {

    const itemsElements: JSX.Element[] = [];

    for (let i = 0; i < props.pagesList.length; ++i) {
        itemsElements.push(
            <MainCategoryItem
                key={props.pagesList[i].uuid}
                sitePage={props.pagesList[i]}/>
        );
    }

    return (
        <div className={styles.groupContainer}>
            <div
                className={styles.groupTitle}>
                {props.groupTitle}
            </div>
            <div className={styles.groupContainerItems}>
                {itemsElements}
            </div>
        </div>
    );
}

function AdminMainCategoryList(props: SmartComponentProps<StoreAdminPageHome>) {

    return (
        <div>
            <AdminMainCategoryGroupList
                groupTitle={'Администрирование'}
                pagesList={props.store.pagesAdministration}
            />
            <AdminMainCategoryGroupList
                groupTitle={'Аттестация'}
                pagesList={props.store.pagesAttestation}
            />
            <AdminMainCategoryGroupList
                groupTitle={'Проекты'}
                pagesList={props.store.pagesProject}
            />
        </div>
    );
}

export default React.memo(AdminMainCategoryList);
