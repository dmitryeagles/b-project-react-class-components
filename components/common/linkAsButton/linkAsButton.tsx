import React from "react";
import {Link} from "react-router-dom";
import {cssClassStandardButtonTypes} from "../standardButton/cssClassStandardButtonTypes";
import styles from '../standardButton/standardButtonStyle.scss';

interface ButtonProps {
    readonly text: string;
    readonly href: string;
    readonly className?: string;
    readonly type?: (keyof typeof cssClassStandardButtonTypes);
    readonly eventClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    readonly isRealLink?: boolean;
    readonly iconLeft?: React.ReactNode;
    readonly iconRight?: React.ReactNode;
    readonly isDownload?: boolean;
}

/**
 * Ссылка роутера, которая выглядит как кнопка
 * @param props
 * @constructor
 */
function LinkAsButton(props: ButtonProps) {

    let cssClass: string = styles.buttonPrimary;
    let componentIconLeft: JSX.Element | null = null;
    let componentIconRight: JSX.Element | null = null;

    if (props.type) {
        if (cssClassStandardButtonTypes.hasOwnProperty(props.type)) {
            cssClass = cssClassStandardButtonTypes[props.type];
        }
    }

    if (props.className) {
        cssClass += ` ${styles.button} ${props.className}`;
    } else {
        cssClass += ` ${styles.button} ${styles.buttonSize}`;
    }

    if (props.iconLeft) {
        componentIconLeft = <span className={styles.iconLeft}>{props.iconLeft}</span>;
    }

    if (props.iconRight) {
        componentIconRight = <span className={styles.iconRight}>{props.iconRight}</span>;
    }

    if (props.type === 'disabled') {
        return (
            <span className={cssClass}>
                {componentIconLeft}
                <span>{props.text}</span>
                {componentIconRight}
            </span>
        );
    }

    if (props.isRealLink) {
        return (
            <a
                className={cssClass}
                onClick={props.eventClick}
                href={props.href}
                download={props.isDownload}
            >
                {componentIconLeft}
                {props.text}
                {componentIconRight}
            </a>
        );
    }

    return (
        <Link
            to={props.href}
            className={cssClass}
            onClick={props.eventClick}
        >
            {componentIconLeft}
            {props.text}
            {componentIconRight}
        </Link>
    );
}

export default React.memo(LinkAsButton);
