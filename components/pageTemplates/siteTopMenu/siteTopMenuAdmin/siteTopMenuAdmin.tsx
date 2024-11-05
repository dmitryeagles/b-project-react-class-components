import {observer} from "mobx-react";
import React from "react";
import {SitePageInfo} from "../../../../interfaces/sitePageInfo";
import {RouterPagesKeysAdmin} from "../../../../staticData/routerPages/routerPagesAdmin";
import {StoreSiteTopMenu} from "../../../../stores/common/storeSiteTopMenu";
import {SiteTopMenu} from "../siteTopMenuBaseComponents/siteTopMenu";
import {SiteTopMenuCompanyLogo} from "../siteTopMenuBaseComponents/siteTopMenuCompanyLogo";
import {SiteTopMenuComponentContainer} from "../siteTopMenuBaseComponents/siteTopMenuComponentContainer";
import {SiteTopMenuContentContainer} from "../siteTopMenuBaseComponents/siteTopMenuContentContainer";
import {SiteTopMenuItemAuthUserName} from "../siteTopMenuBaseComponents/siteTopMenuItemAuthUserName";
import {SiteTopMenuItemLogoutSystem} from "../siteTopMenuBaseComponents/siteTopMenuItemLogoutSystem";
import {SiteTopMenuItemNavigation} from "../siteTopMenuBaseComponents/siteTopMenuItemNavigation";
import {SiteTopMenuItemRoles} from "../siteTopMenuBaseComponents/siteTopMenuItemRoles";
import {SiteTopMenuNavigationItemsList} from "../siteTopMenuBaseComponents/siteTopMenuNavigationItemsList";
import {
    SiteTopMenuNavigationMenuOpenContainer
} from "../siteTopMenuBaseComponents/siteTopMenuNavigationMenuOpenContainer";
import SiteTopMenuNavigationMenuRoles
    from "../siteTopMenuBaseComponents/siteTopMenuNavigationMenuRoles/siteTopMenuNavigationMenuRoles";
import {SiteTopMenuNavigationSeparator} from "../siteTopMenuBaseComponents/siteTopMenuNavigationSeparator";

interface SiteTopMenuAdminProps {
    readonly storeSiteTopMenu: StoreSiteTopMenu<RouterPagesKeysAdmin>;
}

const CurrentUserName = observer((props: SiteTopMenuAdminProps) => {
    const userLastNameAndInitials = props.storeSiteTopMenu.storeCurrentUserInfo.currentUserInfo?.lastNameAndInitials;

    return (
        <SiteTopMenuItemAuthUserName
            currentUserName={userLastNameAndInitials ? userLastNameAndInitials : 'Загрузка...'}
            eventCloseNavMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
            linkCurrentUserInfo={props.storeSiteTopMenu.storeRouter.getPagePath('adminCurrentUserInfo')}
        />
    );
});

const NavigationMenuOpen = React.memo((props: SiteTopMenuAdminProps) => {
    const pagesAdministration: SitePageInfo[] = props.storeSiteTopMenu.storeRouter.getPagesListByKeys([
        'adminQuestionsBank',
        'adminTestList',
        'adminAttestationList',
        'adminAttestationNewEmployees'
    ]);

    const pagesAttestation: SitePageInfo[] = props.storeSiteTopMenu.storeRouter.getPagesListByKeys([
        'adminUsers',
        'adminChoiceReport',
        'adminDictionaryChoice',
        'adminTemplateSEV',
        'adminFeedbackSEV',
        'adminTemplateNM',
        'adminFeedbackNM',
        'adminCreateNews',
    ]);

    const pagesProject: SitePageInfo[] = props.storeSiteTopMenu.storeRouter.getPagesListByKeys([
        'adminProjectsMini5s',
        'adminProjectsLEAN',
        'adminProjectRegistry',
        'adminResourceAlignment',
    ]);

    return (
        <SiteTopMenuNavigationMenuOpenContainer
            eventClose={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
        >
            <SiteTopMenuNavigationSeparator categoryName={'Администрирование'}/>
            <SiteTopMenuNavigationItemsList
                eventCloseMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
                pagesList={pagesAdministration}
            />

            <SiteTopMenuNavigationSeparator categoryName={'Аттестация'}/>
            <SiteTopMenuNavigationItemsList
                eventCloseMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
                pagesList={pagesAttestation}
            />

            <SiteTopMenuNavigationSeparator categoryName={'Проекты'}/>
            <SiteTopMenuNavigationItemsList
                eventCloseMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
                pagesList={pagesProject}
            />
        </SiteTopMenuNavigationMenuOpenContainer>
    );
});

const NavigationMenu = observer((props: SiteTopMenuAdminProps) => {
    if (!props.storeSiteTopMenu.storeSiteNavigationMenu.openNavigationType) {
        return null;
    }

    if (props.storeSiteTopMenu.storeSiteNavigationMenu.openNavigationType === 'roles') {
        return (
            <SiteTopMenuNavigationMenuRoles
                eventCloseNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
                storeCurrentUserInfo={props.storeSiteTopMenu.storeCurrentUserInfo}
            />
        );
    }

    return (<NavigationMenuOpen storeSiteTopMenu={props.storeSiteTopMenu}/>);
});

function SiteTopMenuAdmin(props: SiteTopMenuAdminProps) {
    return (
        <SiteTopMenuComponentContainer
            eventCloseNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
        >
            <SiteTopMenu>
                <SiteTopMenuCompanyLogo
                    linkHomePage={props.storeSiteTopMenu.linkToHomePage}
                />
                <CurrentUserName storeSiteTopMenu={props.storeSiteTopMenu}/>
                <SiteTopMenuContentContainer>
                    <SiteTopMenuItemRoles
                        storeCurrentUserInfo={props.storeSiteTopMenu.storeCurrentUserInfo}
                        eventToggleNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventToggleNavigationRoles}
                    />
                    <SiteTopMenuItemNavigation
                        eventToggleNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventToggleNavigationMenu}
                    />
                    <SiteTopMenuItemLogoutSystem
                        linkToLogoutSystem={props.storeSiteTopMenu.storeRouter.linkLogoutSystem}/>
                </SiteTopMenuContentContainer>
            </SiteTopMenu>
            <NavigationMenu storeSiteTopMenu={props.storeSiteTopMenu}/>
        </SiteTopMenuComponentContainer>
    );
}

export default React.memo(SiteTopMenuAdmin);
