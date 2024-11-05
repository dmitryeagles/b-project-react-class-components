import React from "react";
import styles from './popupFullscreenStyle.scss';

interface popupFullscreenProps {
    children: React.ReactNode;
}

/**
 * Простой вариант всплывающего окно
 * Не содержит событий и кнопок закрытия
 * Можно закрыть только из вне
 * @param props
 * @constructor
 */
function PopupFullscreen(props: popupFullscreenProps){
    return (
        <div className={styles.popupBackground}>
            <div className={styles.popupBody}>
                <div className={styles.popupContentContainer}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PopupFullscreen);