import InterestTag from '@/interface/classes/interestTag_cls';
import store from '@/store';
import PersonalDataApi from '@/api/personal_data/personal_data_api';
import PersonalDataTagsApi from '@/api/personal_data/personal_data_tags_api';

/**
 * In Servive Layer, the Logic to access user status and personal information is implemented.
 *     the service should call api layer to get response, and then update the store with the response.
 *
 * Especially for the asynchoronous operation
 *
 * to make distinct from 'api' layer, the function name should use lower case and underscore.
 *      e.g. get_personal_info() or get_user_info()
 *      in api layer, the function name should use camel case.
 */

/**
 * For Personal Information, it sync every times when refresh if
 *     the user is authorized.
 *
 * Since Vue is a SPA environment, when some items changed,
 *      we both commit to database and update the vuex store state.
 */
export default class PersonalDataService {
    /**
     * Description sync user personal information with server.
     * @returns {any}
     */
    public static async sync_personal_data(): Promise<any> {
        // call api layer to get user personal information

        // sync every time when refresh
        try {
            const response: any = await PersonalDataApi.getPersonalData();
            store.commit('setUserPersonalData', response);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async update_user_interest_tags(tags: InterestTag[]) {
        // call api layer to update user interest tags
        try {
            const tag_keys = tags.map((tag) => tag.key);
            const response = await PersonalDataTagsApi.updateUserTags(tag_keys);
            store.commit('updateUserInterestTags', tags);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
