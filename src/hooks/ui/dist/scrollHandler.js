"use strict";
/**
 * Hook Function are that used for ``addEventListener`` and ``removeEventListener``
 */
exports.__esModule = true;
exports.scrollUpWithItem = exports.onScrollRedirectTitleLink = void 0;
/**
 * Description ：Watch the Window scroll and redirect link to the title
 *
 * @param {any} TitleIdList:string[]
 * @returns {any}
 */
function onScrollRedirectTitleLink(TitleIdList) {
    var scrollPosition = window.scrollY;
    for (var _i = 0, TitleIdList_1 = TitleIdList; _i < TitleIdList_1.length; _i++) {
        var id = TitleIdList_1[_i];
        var element = document.getElementById(id);
        if (element &&
            element.offsetTop <= scrollPosition &&
            element.offsetTop + element.offsetHeight >= scrollPosition) {
            history.replaceState(null, '', "#" + id); // replace the url with the anchor tag
            break;
        }
    }
}
exports.onScrollRedirectTitleLink = onScrollRedirectTitleLink;
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
function scrollUpWithItem(itemid_list, srcollWithid, bottomOrigin) {
    if (bottomOrigin === void 0) { bottomOrigin = 0; }
    var scrollWith = document.getElementById(srcollWithid);
    if (!scrollWith)
        return;
    var scrollWithTopY = scrollWith.offsetTop;
    var currScrollBottomY = window.scrollY + window.innerHeight;
    var dist = currScrollBottomY - scrollWithTopY;
    for (var _i = 0, itemid_list_1 = itemid_list; _i < itemid_list_1.length; _i++) {
        var itemid = itemid_list_1[_i];
        var item = document.getElementById(itemid);
        if (item) {
            item.style.bottom = dist > 0 ? bottomOrigin + dist + "px" : '0px';
        }
    }
}
exports.scrollUpWithItem = scrollUpWithItem;
