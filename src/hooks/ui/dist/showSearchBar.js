"use strict";
exports.__esModule = true;
exports.showSearchBarGlobal = void 0;
function showSearchBarGlobal(event, callback) {
    if (callback === void 0) { callback = null; }
    if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // prevent the default behavior of the "ctrl+k" key combination
        if (searchOverlay) {
            console.log("showing search overlay");
            searchOverlay.show(); // show the search overlay
        }
        else {
            console.log("search overlay not found");
        }
    }
}
exports.showSearchBarGlobal = showSearchBarGlobal;
