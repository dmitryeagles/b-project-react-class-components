import React from "react";
import {Link} from "react-router-dom";
import styles from './returnBackToPageStyle.scss';

interface ReturnBackToPageProps {
    readonly publicText: string;
    readonly linkBack: string;
}

/**
 * Компонент ссылка, вернуться обратно на страницу
 * @constructor
 */
function ReturnBackToPage(props: ReturnBackToPageProps) {

    return (
        <div className={styles.componentContainer}>
            <Link
                className={styles.linkBack}
                to={props.linkBack}
            >
                {props.publicText}
            </Link>
        </div>
    );
}

export default React.memo(ReturnBackToPage);
