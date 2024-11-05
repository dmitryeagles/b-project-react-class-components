import React from "react";
import {InputDropdownItem} from "../inputDropdown";
import styles from './inputDropdownMenuStyle.scss';

const TEXT_EMPTY_ITEMS_DEFAULT: string = 'Нет доступных элементов';

interface InputDropdownMenuProps {
    readonly selectedItemValue?: any;
    readonly itemsList?: any[];
    readonly emptyText?: string;
}

interface InputDropdownMenuItemProps<ValueType = number> {
    readonly selectedItemValue?: ValueType;
    readonly item: InputDropdownItem<ValueType>;
}


const InputDropdownMenuItem = React.memo((props: InputDropdownMenuItemProps) => {
    return (
        <div
            data-value={props.item.value}
            onClick={()=>{
                console.log(props.item)
            }}
        >
            {props.item.label}
        </div>
    );
});


function InputDropdownMenu(props: InputDropdownMenuProps) {


    if (!Array.isArray(props.itemsList)) {
        return (
            <div className={styles.componentContainer}>
                <div>{props.emptyText ? props.emptyText : TEXT_EMPTY_ITEMS_DEFAULT}</div>
            </div>
        );
    }

    if (!props.itemsList.length) {
        return (
            <div className={styles.componentContainer}>
                <div>{props.emptyText ? props.emptyText : TEXT_EMPTY_ITEMS_DEFAULT}</div>
            </div>
        );
    }

    const menuElements: JSX.Element[] = [];

    for (let i = 0; i < props.itemsList.length; ++i) {
        menuElements.push(
            <InputDropdownMenuItem
                item={props.itemsList[i]}
                selectedItemValue={props.selectedItemValue}
                key={props.itemsList[i].value}
            />
        );
    }

    return (
        <div className={styles.componentContainer}>
            {menuElements}
        </div>
    );
}

export default React.memo(InputDropdownMenu);