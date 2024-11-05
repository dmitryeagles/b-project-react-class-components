import React from "react";
import {cssClassStandardButtonTypes} from "./cssClassStandardButtonTypes";
import styles from './standardButtonStyle.scss';

interface StandardButtonProps {
    readonly text: string;
    readonly className?: string;
    readonly type?: (keyof typeof cssClassStandardButtonTypes);
    readonly eventClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly iconLeft?: React.ReactNode;
    readonly iconRight?: React.ReactNode;
    readonly dataAttributeId?: string;
}

/**
 * Стандартная кнопка
 * При получении className, забывает свой размер шрифта
 * @param props
 * @constructor
 */
function StandardButton(props: StandardButtonProps) {
    let cssClass: string = styles.buttonPrimary;
    let componentIconLeft: JSX.Element | null = null;
    let componentIconRight: JSX.Element | null = null;
    let eventClick: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined = props.eventClick;

    if (props.type) {
        if (cssClassStandardButtonTypes.hasOwnProperty(props.type)) {
            cssClass = cssClassStandardButtonTypes[props.type];
        }

        if (props.type === 'disabled') {
            eventClick = undefined;
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

    return (
        <button
            disabled={props.type === 'disabled' ? true : undefined}
            className={cssClass}
            onClick={eventClick}
            data-id={props.dataAttributeId}
        >
            {componentIconLeft}
            <span>{props.text}</span>
            {componentIconRight}
        </button>
    );
}

export default React.memo(StandardButton);
