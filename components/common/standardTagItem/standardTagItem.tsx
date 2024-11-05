import React from "react";
import {fixedLengthString} from "../../../helpers/fixedLengthString";
import styles from './standardTagItemStyle.scss';

interface StandardTagItemProps {
    readonly tagPublicName: string;
    readonly publicNameMaxLength: number;
}

function StandardTagItem(props: StandardTagItemProps){
    return(
        <span
            title={props.tagPublicName}
            className={styles.standardTagItem}
        >
            {fixedLengthString({
                maxLength: props.publicNameMaxLength,
                stringToFixed: props.tagPublicName
            })}
        </span>
    );
}

export default React.memo(StandardTagItem);
