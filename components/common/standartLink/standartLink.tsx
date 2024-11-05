import React from "react";
import {Link} from "react-router-dom";
import styles from './standartLinkStyle.scss';

interface LinkProps {
    readonly text: string;
    readonly href: string;
    readonly className?: string;
    readonly isRealLink?: boolean;
    readonly iconLeft?: React.ReactNode;
    readonly isDownload?: boolean;
}

/**
 * Ссылка роутера, которая выглядит как кнопка
 * @param props
 * @constructor
 */
function StandartLink(props: LinkProps) {

    let componentIconLeft: JSX.Element | null = null;

    if (props.iconLeft) {
        componentIconLeft = <span className={styles.iconLeft}>{props.iconLeft}</span>;
    }

    if (props.isRealLink) {
        return (
            <a
                className={styles.link}
                href={props.href}
                download={props.isDownload}
            >
                {componentIconLeft}
                {props.text}
            </a>
        );
    }

    return (
        <Link
            to={props.href}
        >
            {componentIconLeft}
            {props.text}
        </Link>
    );
}

export default React.memo(StandartLink);
