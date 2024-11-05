import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {LoaderSuspense} from "../../common/loaderSuspense";
import styles from './authorizationBackgroundStyle.scss';


export default function AuthorizationBackground() {
    return (
        <div className={styles.loginFormBackground}>
                <ul className={styles.circles}>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                </ul>
            <div className={styles.loginFormBackgroundColor}>
                <Suspense fallback={<LoaderSuspense/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    );
}
