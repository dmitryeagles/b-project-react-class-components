import React from "react";
import styles from "./itemShowHideDetailInfoStyle.scss";

interface ItemShowHideDetailInfoProps {
    readonly isOpen: boolean;
    readonly eventToggleOpenClose: () => void;
    readonly publicTextOpen: string;
    readonly publicTextClose: string;
}

function ItemShowHideDetailInfo(props: ItemShowHideDetailInfoProps){
    const publicText: string = props.isOpen ? props.publicTextOpen : props.publicTextClose;
    const cssClassStatus: string = props.isOpen ? styles.buttonShowDetailInfoOpen : styles.buttonShowDetailInfoClose;
    return (
        <div className={styles.componentContainer}>
            <span
                className={`${cssClassStatus} ${styles.buttonShowDetailInfo}`}
                onClick={props.eventToggleOpenClose}>
                {publicText}
            </span>
        </div>
    );
}

export default React.memo(ItemShowHideDetailInfo);


