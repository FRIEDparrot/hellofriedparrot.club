"use strict";
exports.__esModule = true;
exports.useShiftKey = exports.useCtrlKey = void 0;
function useCtrlKey(key, event, callback) {
    if (event.key === key && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // prevent the default behavior of the "ctrl+k" key combination
        if (callback) {
            callback(); // call the callback function if provided
        }
    }
}
exports.useCtrlKey = useCtrlKey;
function useShiftKey(key, event, callback) {
    if (event.key === key && event.shiftKey) {
        event.preventDefault(); // prevent the default behavior of the "shift+k" key combination
        if (callback) {
            callback(); // call the callback function if provided
        }
    }
}
exports.useShiftKey = useShiftKey;
