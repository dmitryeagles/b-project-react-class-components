import React from "react";
import styles from './siteTopMenuComponentContainerStyle.scss';

interface SiteTopMenuComponentContainerProps {
    readonly children: React.ReactNode;
    readonly eventCloseNavigationMenu?: () => void;
}

/**
 * Основной контейнер для компонента верхнего меню
 * ВАЖНО! должен находиться на самом верхнем уровне
 */
class SiteTopMenuComponentContainer extends React.PureComponent<SiteTopMenuComponentContainerProps> {
    private _isCloseOnClick: boolean;

    private _eventCloseOutsideClick() {
        if(typeof this.props.eventCloseNavigationMenu !== 'function') {
            return;
        }

        if (this._isCloseOnClick) {
            this.props.eventCloseNavigationMenu();
        }
    }

    private _eventMouseEnterMenu() {
        this._isCloseOnClick = false;
    }

    private _eventMouseLeaveMenu() {
        this._isCloseOnClick = true;
    }

    private _addEventListenersPopup() {
        document.addEventListener('mousedown', this._eventCloseOutsideClick);
    }

    private _removeEventListenersPopup() {
        document.removeEventListener('mousedown', this._eventCloseOutsideClick);
    }

    public componentWillUnmount() {
        if(typeof this.props.eventCloseNavigationMenu === 'function') {
            this._removeEventListenersPopup();
        }
    }

    public componentDidMount() {
        if(typeof this.props.eventCloseNavigationMenu === 'function') {
            this._addEventListenersPopup();
        }
    }

    constructor(props:SiteTopMenuComponentContainerProps) {
        super(props);
        this._isCloseOnClick = false;
        this._eventCloseOutsideClick = this._eventCloseOutsideClick.bind(this);
        this._eventMouseEnterMenu = this._eventMouseEnterMenu.bind(this);
        this._eventMouseLeaveMenu = this._eventMouseLeaveMenu.bind(this);
    }

    render() {
        return (
            <div
                className={styles.componentContainer}
                onMouseEnter={this._eventMouseEnterMenu}
                onMouseLeave={this._eventMouseLeaveMenu}
            >
                {this.props.children}
            </div>
        );
    }
}

export default React.memo(SiteTopMenuComponentContainer);
