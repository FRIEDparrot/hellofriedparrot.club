"use strict";
exports.__esModule = true;
/**
 * Description
 * @param {any} confirmDialogRef:any
 * @param {any} message:string
 * @param {any} callback:(confirmed:boolean
 * @returns {any}
 */
function showConfirmDialog(confirmDialogRef) {
    if (confirmDialogRef) {
        confirmDialogRef.show();
    }
}
exports["default"] = showConfirmDialog;
