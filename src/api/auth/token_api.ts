import { getPreferedLangCode } from '@/store';
import request, { postRequestWithCredentials } from '@/api';
import store from '@/store';

export default class TokenApi {
    /**
     * Description
     *     Login State Verification API
     * @returns {any}
     */
    private static async verifyToken() {
        try {
            /** no need to  */
            const response = await postRequestWithCredentials(
                '/auth/token/verify',
                null,
            );
            return Promise.resolve(response);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }
    /**
     * Description Global function for verify the user token
     *      check if user is loggedd in (authenticated) or not.
     * @returns {any}
     */
    static async VerifyUserToken(): Promise<any> {
        /* only verify the token if the user is not authorized 
            for save the server resources */
        if (!store.state.authorized) {
            try {
                const response: any = await TokenApi.verifyToken();
                const user_info = response.data.user_info;
                store.commit('authorizeUser', user_info);
                return Promise.resolve(response);
            } catch (error) {
                // do nothing, user is not authorized, error would be automatically logged
                return Promise.reject(error);
            }
        }
        return Promise.resolve(null);
    }
    /**
     * Description Global function for delete the user token
     *      once called this  funcction, it will remove the user token from the server
     *      also it will remove the user info from the store.
     *      user will be logged out.
     * @returns {any}
     */
    static async DeleteUserToken(): Promise<any> {
        try {
            const response = await postRequestWithCredentials(
                'auth/token/delete',
                null,
            );
            store.commit('unAuthorizeUser'); // remove the user info from the store
            return Promise.resolve(response);
        } catch (error) {
            // token delete failed, so it is still valid
            return Promise.reject(error);
        }
    }

    static async setUserCookiesUsage(use_cookies: number) {
        return postRequestWithCredentials('auth/token/set-use-cookies', {
            use_cookies: use_cookies,
        });
    }

    /**
     * TODO: refresh token expirations in backend (not implemented yet)
     * Description Global function for reset the user token expirations time
     *      used when user change the cookie settings on the browser.
     * @returns {any}
     */
    static async resetTokenExpirations() {
        try {
            const response = await request.post('auth/token/reset', null, {
                withCredentials: true,
                params: {
                    lang: getPreferedLangCode(),
                },
            });
            return Promise.resolve(response);
        } catch (error) {}
    }
}
