import TokenApi from '@/api/auth/token_api';

export default class LogoutApi {
    /**
     * Description Just delete the token from the server and reload the page
     * TODO: Remove that and add it in "service" Layer
     * @returns {any}
     */
    static async logoutUser(): Promise<boolean> {
        try {
            const response = await TokenApi.DeleteUserToken();
            window.location.reload();
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
