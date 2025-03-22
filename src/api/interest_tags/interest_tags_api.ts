import {
    getRequestWithCredentials,
    ResponseHandler,
    postRequestWithCredentials,
} from '@/api';
import InterestTag from '@/interface/classes/interestTag_cls';
import { IstdDataTableRequestParams } from '@/interface/tables/stdDataTableServer';

function makeUrl(url: string) {
    return '/interest-tags' + url;
}

export default class InterestTagApi {
    public static async addNewTagToDatabase(tagForm: any) {
        return await ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/add'), tagForm),
        );
    }

    public static async deleteTagFromDatabase(tag_key_list: string[]) {
        return await ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/delete'), {
                tag_key_list: tag_key_list,
            }),
        );
    }

    public static async getTagByName(
        tag_translation: string,
    ): Promise<InterestTag> {
        const response: any = await ResponseHandler(() =>
            getRequestWithCredentials(
                makeUrl('/get-by-name') + '?tag=' + tag_translation,
            ),
        );
        return response;
    }

    /**
     * Description
     * @param {any} tag_keys:string[]
     * @returns {any}
     */
    public static async getTagByKeys(tag_keys: string[]) {
        return await ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/get-by-keys'), {
                key_list: tag_keys,
            }),
        );
    }

    public static async getTagList(param: IstdDataTableRequestParams) {
        return await ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/getlist'), param),
        );
    }
}
