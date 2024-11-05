import React from "react";
import {Link} from "react-router-dom";
import styles from './editableItemLargeButtonStyle.scss';


type Status = 'default' | 'success' | 'error';

export interface EditableItemLargeButtonProps {
    readonly buttonText: string;
    readonly linkOrEvent: string | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
    readonly itemUuid?: string;
    readonly status?: Status;
}

function getCssStatusClass(status?: Status | null) {
    if (status === 'success') {
        return styles.successStatus;
    }

    if (status === 'error') {
        return styles.errorStatus;
    }

    return styles.defaultStatus;
}

function EditableItemLargeButton(props: EditableItemLargeButtonProps) {
    const cssClass = `${styles.largeButton} ${getCssStatusClass(props.status)}`;

    if (typeof props.linkOrEvent === 'function') {
        return (
            <div
                data-id={props.itemUuid}
                onClick={props.linkOrEvent}
                className={cssClass}>
                {props.buttonText}
            </div>
        );
    }

    if (typeof props.linkOrEvent === 'string') {
        return (
            <Link
                data-id={props.itemUuid}
                className={cssClass}
                to={props.linkOrEvent}>
                {props.buttonText}
            </Link>
        );
    }

    return null;
}

export default React.memo(EditableItemLargeButton);
