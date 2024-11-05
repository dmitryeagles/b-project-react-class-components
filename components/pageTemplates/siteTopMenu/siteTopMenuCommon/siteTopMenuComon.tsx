import {observer} from "mobx-react";
import React from "react";
import {RouterPagesKeysCommon} from "../../../../staticData/routerPages/routerPagesCommon";
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

interface SiteTopMenuCommonProps {
    readonly storeSiteTopMenu: StoreSiteTopMenu<RouterPagesKeysCommon>;
}

const CurrentUserName = observer((props: SiteTopMenuCommonProps) => {
    const userLastNameAndInitials = props.storeSiteTopMenu.storeCurrentUserInfo.currentUserInfo?.lastNameAndInitials;

    return (
        <SiteTopMenuItemAuthUserName
            currentUserName={userLastNameAndInitials ? userLastNameAndInitials : 'Загрузка...'}
            eventCloseNavMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
            linkCurrentUserInfo={props.storeSiteTopMenu.storeRouter.getPagePath('currentUserInfo')}
        />
    );
});

const NavigationMenuOpen = React.memo((props: SiteTopMenuCommonProps) => {
    return (
        <SiteTopMenuNavigationMenuOpenContainer
            eventClose={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
        >
            <SiteTopMenuNavigationItemsList
                eventCloseMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
                pagesList={props.storeSiteTopMenu.navigationPages}
            />
        </SiteTopMenuNavigationMenuOpenContainer>
    );
});

const NavigationMenu = observer((props: SiteTopMenuCommonProps) => {
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

function SiteTopMenuCommon(props: SiteTopMenuCommonProps) {
    return (
        <SiteTopMenuComponentContainer
            eventCloseNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventCloseNavigationMenu}
        >
            <SiteTopMenu>
                <SiteTopMenuCompanyLogo
                    linkHomePage={props.storeSiteTopMenu.linkToHomePage}
                />
                <CurrentUserName
                    storeSiteTopMenu={props.storeSiteTopMenu}
                />
                <SiteTopMenuContentContainer>
                    <SiteTopMenuItemRoles
                        storeCurrentUserInfo={props.storeSiteTopMenu.storeCurrentUserInfo}
                        eventToggleNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventToggleNavigationRoles}
                    />
                    {
                        props.storeSiteTopMenu.navigationPages.length ?
                            <SiteTopMenuItemNavigation
                                eventToggleNavigationMenu={props.storeSiteTopMenu.storeSiteNavigationMenu.eventToggleNavigationMenu}
                            /> : null
                    }
                    <SiteTopMenuItemLogoutSystem
                        linkToLogoutSystem={props.storeSiteTopMenu.storeRouter.linkLogoutSystem}/>
                </SiteTopMenuContentContainer>
            </SiteTopMenu>
            <NavigationMenu {...props}/>
        </SiteTopMenuComponentContainer>
    );
}

export default React.memo(SiteTopMenuCommon);
