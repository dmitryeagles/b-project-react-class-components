import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {LoaderSuspense} from "../../common/loaderSuspense";
import {STATIC_TEXT} from './staticText';
import styles from './templatePageHomeStyle.scss';

interface TemplatePageHomeProps {
    readonly siteTopMenuComponent?: React.ReactNode;
}

function TemplatePageHome(props: TemplatePageHomeProps) {
    return (
        <div>
            {props.siteTopMenuComponent ? props.siteTopMenuComponent : null}
            <div className={styles.bigHeaderImageContainer}>
                <div className={styles.headerContentContainer}>
                    <div className={styles.headerBigTextGreetings}>
                        {STATIC_TEXT.headerGreetings}
                    </div>

                    <div className={styles.headerTextInfo}>
                        {STATIC_TEXT.headerInfo}
                    </div>
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

export default React.memo(TemplatePageHome);
