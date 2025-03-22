import floatingAlert from '@/components/popups/floatingAlert.vue';
import i18n from '@/locales/lang';

/**
 * Description Useful Tool function,  used for showing floating alert.
 * @param {any} emailAlertRef:any
 * @param {any} //inputthe$refs.floatingAlertsucceed:boolean=true
 * @param {any} msg:string="emailsendsuccessfully"
 * @returns {any}
 */
export default function showFloatingAlert(
    emailAlertRef: InstanceType<typeof floatingAlert>, // input the $refs.floatingAlert
    succeed: boolean = true,
    msg: string = 'This is a success message',
) {
    if (emailAlertRef) {
        emailAlertRef.show(
            succeed ? 'success' : 'error',
            succeed
                ? (i18n.global as any).t('g.success')
                : (i18n.global as any).t('g.error'),
            msg,
        );
    }
}
