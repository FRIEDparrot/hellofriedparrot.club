/**
 * Hook Function are that used for ``addEventListener`` and ``removeEventListener``
 */

/**
 * Description ：Watch the Window scroll and redirect link to the title
 *
 * @param {any} TitleIdList:string[]
 * @returns {any}
 */
export function onScrollRedirectTitleLink(TitleIdList: string[]): void {
    const scrollPosition = window.scrollY;
    for (let id of TitleIdList) {
        const element = document.getElementById(id);
        if (
            element &&
            element.offsetTop <= scrollPosition &&
            element.offsetTop + element.offsetHeight >= scrollPosition
        ) {
            history.replaceState(null, '', `#${id}`); // replace the url with the anchor tag
            break;
        }
    }
}

/**
 * Description This function applied to fixed style item,
 *     when the second item enter the view,
 *     scroll up the first item with the second item's position
 *
 * @param {any} itemid_list: list of string the id of the item to be scrolled up
 * @param {any} srcollWithid:string id of the item to be scrolled up with
 * @param {any} bottomOrigin: bottom distance of the item to be scrolled up with
 * @warning  add EventListener on both scroll and resize event to make it work correctly
 * @returns {any}
 */
export function scrollUpWithItem(
    itemid_list: string[],
    srcollWithid: string,
    bottomOrigin: number = 0,
) {
    const scrollWith = document.getElementById(srcollWithid);
    if (!scrollWith) return;
    const scrollWithTopY = scrollWith.offsetTop;
    const currScrollBottomY = window.scrollY + window.innerHeight;
    const dist = currScrollBottomY - scrollWithTopY;

    for (const itemid of itemid_list) {
        const item = document.getElementById(itemid);
        if (item) {
            item.style.bottom = dist > 0 ? `${bottomOrigin + dist}px` : '0px';
        }
    }
}
