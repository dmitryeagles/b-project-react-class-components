import React from "react";
import {RouterPagesKeysGuest} from "../../../../staticData/routerPages/routerPagesGuest";
import {StoreSiteTopMenu} from "../../../../stores/common/storeSiteTopMenu";
import {SiteTopMenu} from "../siteTopMenuBaseComponents/siteTopMenu";
import {SiteTopMenuCompanyLogo} from "../siteTopMenuBaseComponents/siteTopMenuCompanyLogo";
import {SiteTopMenuComponentContainer} from "../siteTopMenuBaseComponents/siteTopMenuComponentContainer";
import {SiteTopMenuContentContainer} from "../siteTopMenuBaseComponents/siteTopMenuContentContainer";
import styles from "./siteTopMenuGuestStyle.scss";

//region Регистрация в системе
const TEXT_TOP_MENU_ITEM_LOGIN: string = 'Авторизация';

interface TopMenuItemLoginProps {
    readonly linkToPageLogin: string;
}

const TopMenuItemLogin = React.memo((props: TopMenuItemLoginProps) => {
    return (
        <>
            <a
                className={`${styles.buttonLoginSystem} ${styles.fullSizeBtn}`}
                href={props.linkToPageLogin}>
                {TEXT_TOP_MENU_ITEM_LOGIN}
            </a>
            <a
                title={TEXT_TOP_MENU_ITEM_LOGIN}
                className={`${styles.mobileBtn} ${styles.mobileAuthBtnLogin}`}
                href={props.linkToPageLogin}
            />
        </>
    );
});
//endregion

//region Восстановить пароль
const TEXT_TOP_MENU_ITEM_RECOVER_PASSWORD: string = 'Восстановить пароль';

interface TopMenuItemRecoverPasswordProps {
    readonly linkToPageRecoverPassword: string;
}

const TopMenuItemRecoverPassword = React.memo((props: TopMenuItemRecoverPasswordProps) => {
        return (
            <>
                <a
                    className={`${styles.buttonRecoverPassword} ${styles.fullSizeBtn}`}
                    href={props.linkToPageRecoverPassword}>
                    {TEXT_TOP_MENU_ITEM_RECOVER_PASSWORD}
                </a>
                <a
                    title={TEXT_TOP_MENU_ITEM_RECOVER_PASSWORD}
                    className={`${styles.mobileBtn} ${styles.mobileAuthBtnRecoverPassword}`}
                    href={props.linkToPageRecoverPassword}
                />
            </>
        );
    }
);

//endregion

interface SiteTopMenuGuestProps {
    readonly storeSiteTopMenu: StoreSiteTopMenu<RouterPagesKeysGuest>;
    readonly linkToPageLogin: string;
    readonly linkToPageRecoverPassword: string;
}

function SiteTopMenuGuest(props: SiteTopMenuGuestProps) {
    return (
        <SiteTopMenuComponentContainer>
            <SiteTopMenu>
                <SiteTopMenuCompanyLogo
                    linkHomePage={props.storeSiteTopMenu.linkToHomePage}
                />
                <SiteTopMenuContentContainer>
                    <TopMenuItemLogin linkToPageLogin={props.linkToPageLogin}/>
                    <TopMenuItemRecoverPassword linkToPageRecoverPassword={props.linkToPageRecoverPassword}/>
                </SiteTopMenuContentContainer>
            </SiteTopMenu>
        </SiteTopMenuComponentContainer>
    );
}

export default React.memo(SiteTopMenuGuest);
