import React from "react";
import Lottie from "react-lottie-player";
import {Link} from "react-router-dom";
import lottieAnimation404Page from '../../../lottieAnimation/404Page.json';
import styles from './error404Style.scss';

interface Error404Props {
    hrefGoHome: string;
}

const TEXT_PAGE_NOT_FOUND: string = 'Страница не найдена';
const TEXT_LINK_GO_HOME: string = 'Главная';

/**
 * Показывает ошибку 404 =)
 * @param props
 * @constructor
 */
function Error404(props: Error404Props) {
    return (
        <div className={styles.componentContainer}>
            <Lottie
                className={styles.animationContainer}
                animationData={lottieAnimation404Page}
                play={true}
            />
            <div className={styles.containerText}>{TEXT_PAGE_NOT_FOUND}</div>
            <Link className={styles.homeLink} to={props.hrefGoHome}>
                {TEXT_LINK_GO_HOME}
            </Link>
        </div>
    );
}

export default React.memo(Error404);

