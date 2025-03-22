import request, {
    ResponseHandler,
    postRequest,
    getRequest,
    postRequestWithCredentials,
} from '@/api';

import TokenApi from '@/api/auth/token_api';

export default class LoginApi {
    /**
     * Description Submit the login form data With UserName and Passwor
     * @param {any} login_form_data:any  The json data of the form
     * @returns {any}
     *       Promise (use try... catch  or then... catch):
     *         - succeed : response
     *         - failed  : error { error_code,  message }
     */
    static async loginUserByPassword(login_form_data: any) {
        const params = { method: 'password' };
        return ResponseHandler(() =>
            postRequestWithCredentials('auth/login/', login_form_data, params),
        );
    }

    /**
     * Description Submit the login form data With Email and Verification Code
     * @param {any} login_form_data:any  The json data of the for
     * @returns {any}
     *      Promise :
     *         - succeed : response
     *         - failed  : error { error_code,  message }
     */
    static async loginUserByCaptcha(login_form_data: any) {
        const params = { method: 'captcha' };
        return postRequestWithCredentials(
            'auth/login/',
            login_form_data,
            params,
        );
    }
}
