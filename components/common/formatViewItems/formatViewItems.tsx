import {observer} from "mobx-react";
import React from "react";
import LineViewFormatIco from "../../../img/svg_component/lineViewFormat.svg";
import TileViewFormatIco from "../../../img/svg_component/tileViewFormat.svg";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentSelectViewFormatItems} from "../../../stores/common/storeComponentSelectViewFormatItems";
import styles from './formatViewItemsStyle.scss';

function FormatViewItems(props: SmartComponentProps<StoreComponentSelectViewFormatItems>) {
    return (
        <div className={styles.componentContainer}>
            <div
                className={!props.store.isActiveViewGrid ? `${styles.lineIco} ${styles.isActive}` : styles.lineIco}
                onClick={props.store.isActiveViewGrid ? props.store.eventToggleValue : undefined}
            >
                <LineViewFormatIco/>
            </div>
            <div
                className={props.store.isActiveViewGrid ? `${styles.tileIco} ${styles.isActive}` : styles.tileIco}
                onClick={!props.store.isActiveViewGrid ? props.store.eventToggleValue : undefined}
            >
                <TileViewFormatIco/>
            </div>
        </div>
    );
}

export default observer(FormatViewItems);
