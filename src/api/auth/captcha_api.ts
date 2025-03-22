import request from '@/api';
import { getPreferedLangCode } from '@/store';

export const captcha_base_url = {
    login: 'auth/login',
    register: 'auth/register',
    reset_password: 'auth/reset_password', // reset password
    change_password: 'auth/change_password', // change password
};

/**
 * This file contains the API for get captcha
 */
export default class CaptchaApi {
    static get_api_link(base_url: string) {
        return `${base_url}/get-captcha`;
    }

    static async getCaptcha(base_url: string, data: any) {
        try {
            const captch_link = CaptchaApi.get_api_link(base_url);
            const response = await request.post(captch_link, data, {
                withCredentials: true,
                params: {
                    lang: getPreferedLangCode() || 'en',
                },
            });
            return Promise.resolve(response);
        } catch (error: any) {
            return Promise.reject({
                message:
                    error.response?.data?.error?.message ?? // we use error.response.data.error.message from server response
                    error.message ??
                    'Something went wrong, please contact for support',
            });
        }
    }
}
