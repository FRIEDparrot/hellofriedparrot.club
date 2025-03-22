/**
 * Description
 * @param {any} confirmDialogRef:any
 * @param {any} message:string
 * @param {any} callback:(confirmed:boolean
 * @returns {any}
 */
export default function showConfirmDialog(confirmDialogRef: any) {
    if (confirmDialogRef) {
        confirmDialogRef.show();
    }
}
