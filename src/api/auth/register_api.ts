import request, {
    ResponseHandler,
    postRequest,
    getRequest,
    postRequestWithCredentials,
} from '@/api';
import { getPreferedLangCode } from '@/store';

export default class RegisterApi {
    /**
     * Description
     *
     * @todo use prefered lang code in register for send the correct email template
     * @param {any} registerFormData:any
     * @returns {any}
     *       Promise :
     *         - succeed : response
     *         - failed  : error { error_code,  message }
     */
    static async registerNewUser(registerFormData: any) {
        return ResponseHandler(() =>
            request.post('auth/register/submit', registerFormData, {
                params: {
                    lang: getPreferedLangCode() || 'en',
                },
            }),
        );
    }
}
