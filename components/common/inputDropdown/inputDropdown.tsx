import React from "react";
import InputDropdownMenu from "./InputDropdownMenu/inputDropdownMenu";
import styles from './inputDropdownStyle.scss';

export interface DropdownListItem<ValueType = number> {
    readonly value: ValueType;
    readonly label: string;
}

export interface InputDropdownItem<ValueType = number> extends DropdownListItem<ValueType> {
}

interface InputDropdownProps<ValueType = number> {
    readonly selectedItemValue?: ValueType;
    readonly itemsList?: InputDropdownItem<ValueType>[];
    readonly emptyItemsText?: string;
}

interface InputDropdownState<ValueType = number> {
    readonly selectedItemValue?: ValueType;
    readonly menuOpen?: 'top' | 'down';
}


class InputDropdown<ValueType = number> extends React.PureComponent<InputDropdownProps<ValueType>, InputDropdownState<ValueType>> {

    private _eventInputFocus() {

        if (this.state.menuOpen) {
            return;
        }

        this.setState(() => {
            return {
                menuOpen: 'down',
                isInputFocus: true
            }
        });
    }


    private _eventOpenMenuClose() {

        setTimeout(() => {
            this.setState(() => {
                return {
                    menuOpen: undefined,
                }
            });
        }, 100);
    }

    constructor(props: InputDropdownProps<ValueType>) {
        super(props);
        this._eventInputFocus = this._eventInputFocus.bind(this);
        this._eventOpenMenuClose = this._eventOpenMenuClose.bind(this);

        this.state = {
            menuOpen: undefined,
            selectedItemValue: props.selectedItemValue,
        };
    }


    render() {
        return (
            <div className={styles.componentContainer}>
                <div>
                    <input
                        onFocus={this._eventInputFocus}
                        onBlur={this._eventOpenMenuClose}
                    />
                    {
                        this.state.menuOpen === 'down' ?
                            <div className={styles.dropdownMenuContainer}>
                                <InputDropdownMenu
                                    selectedItemValue={this.props.selectedItemValue}
                                    itemsList={this.props.itemsList}
                                />
                            </div> : null
                    }
                </div>
            </div>
        );
    }

}

export default InputDropdown;