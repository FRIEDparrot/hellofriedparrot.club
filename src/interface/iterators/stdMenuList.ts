export interface IstdMenuItem<T = any> {
    titleKey?: string;
    title?: string;
    type?: string; // for 'divider', 'subheader'
    priority?: number;
    icon?: string; // prepend icon (or append icon)
    badge?: boolean; // show badge
    badgeContent?: string; // number to show in badge(if badge is true)
    url?: string;
    open?: boolean; // if the item is open by default
    disabled?: boolean; // if the item is disabled
    child?: Array<IstdMenuItem<T>>; // submenu items
    callback?: (
        params: T,
    ) => void /* if the click needs outer item parameters, it can be passed through this callback */;
}

export interface IstdMenuList<T = any> {
    items: Array<IstdMenuItem<T>>;
}
