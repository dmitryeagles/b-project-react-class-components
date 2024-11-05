import React from "react";
import {NavLink} from "react-router-dom";
import {SitePageInfo} from "../../../../../interfaces/sitePageInfo";
import styles from "./siteTopMenuNavigationItemsListStyle.scss";

function getCssClassMenuItem(inputOptions: { isActive: boolean }): string {
    if (inputOptions.isActive) {
        return `${styles.navigationLink} ${styles.navigationLinkActive}`
    } else {
        return `${styles.navigationLink} ${styles.navigationLinkDefault}`;
    }
}

interface NavigationLinkProps {
    readonly pagesInfo: SitePageInfo;
    readonly eventCloseMenu: () => void;
}

const NavigationLink = React.memo((props: NavigationLinkProps) => {
    return (
        <NavLink
            to={props.pagesInfo.fullPath}
            className={getCssClassMenuItem}
            onClick={props.eventCloseMenu}
        >
            {props.pagesInfo.pagePublicName}
        </NavLink>
    );
});


interface SiteTopMenuNavigationItemsListProps {
    readonly pagesList: SitePageInfo[];
    readonly eventCloseMenu: () => void;
}

/**
 * Список ссылок навигации, в открытом меню навигации
 * @param props
 * @constructor
 */
function SiteTopMenuNavigationItemsList(props: SiteTopMenuNavigationItemsListProps) {

    const itemsElements: JSX.Element[] = [];

    for(let i = 0; i< props.pagesList.length; ++i) {
        itemsElements.push(
            <NavigationLink
                key={props.pagesList[i].uuid}
                eventCloseMenu={props.eventCloseMenu}
                pagesInfo={props.pagesList[i]}
            />
        );
    }

    return (
        <div>
            {itemsElements}
        </div>
    );
}

export default React.memo(SiteTopMenuNavigationItemsList);
