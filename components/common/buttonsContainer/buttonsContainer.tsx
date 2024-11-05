import React from "react";
import styles from './buttonsContainerStyle.scss';

interface ButtonsContainerProps {
    children: React.ReactNode;
    buttonsAlign?: 'center' | 'right' | 'left';
    className?: string;
}

/**
 * Контейнер для кнопок
 * По умолчанию выравнивает их по центру и добавляет margin
 * @param props
 * @constructor
 */
function ButtonsContainer(props: ButtonsContainerProps) {

    let cssClassButtonsAlign = styles.buttonsAlignCenter;

    if (props.buttonsAlign === 'left') {
        cssClassButtonsAlign = styles.buttonsAlignLeft;
    } else if (props.buttonsAlign === 'right') {
        cssClassButtonsAlign = styles.buttonsAlignRight;
    }

    return (
        <div className={props.className ?
            `${props.className} ${styles.buttonsContainer} ${cssClassButtonsAlign}` :
            `${cssClassButtonsAlign} ${styles.buttonsContainer}`}
        >
            {props.children}
        </div>
    );
}

export default React.memo(ButtonsContainer);
