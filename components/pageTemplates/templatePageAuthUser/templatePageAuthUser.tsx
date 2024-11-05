import {observer} from "mobx-react";
import React, {Suspense} from "react";
import {Link, Outlet} from "react-router-dom";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreSitePageTitle} from "../../../stores/common/storeSitePageTitle";
import {LoaderSuspense} from "../../common/loaderSuspense";
import styles from './templatePageAuthUserStyle.scss';

interface TemplatePageHomeProps {
    readonly siteTopMenu?: React.ReactNode;
    readonly storeSitePageTitle: StoreSitePageTitle;
}

const ButtonReturnBack = observer((props: SmartComponentProps<StoreSitePageTitle>) => {
    if (props.store.linkBack) {
        return (
            <Link
                onClick={props.store.isHasEventReturnBack ? props.store.eventReturnBack : undefined}
                className={styles.linkBack}
                to={props.store.linkBack}
            />
        );
    }

    if (props.store.isHasEventReturnBack) {
        return (
            <span
                onClick={props.store.eventReturnBack}
                className={styles.linkBack}
            />
        );
    }

    return null;
});

const PageTitle = observer((props: SmartComponentProps<StoreSitePageTitle>) => {
    return (
        <div className={styles.pageTitleContainer}>
            <div className={styles.pageTitle}>
                <ButtonReturnBack store={props.store}/>
                <span>{props.store.pageTitle}</span>
            </div>
        </div>
    );
});

function TemplatePageAuthUser(props: TemplatePageHomeProps) {
    return (
        <div>
            {props.siteTopMenu ? props.siteTopMenu : null}
            <div className={styles.bigHeaderArea}>
                <div className={styles.headerContentContainer}>
                    <PageTitle store={props.storeSitePageTitle}/>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.contentPage}>
                    <Suspense fallback={<LoaderSuspense/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default React.memo(TemplatePageAuthUser);
