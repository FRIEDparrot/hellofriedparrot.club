import {
    ResponseHandler,
    postRequestWithCredentials,
    getRequestWithCredentials,
} from '@/api';

function makeUrl(url: string) {
    const prefix = '/personal-data/interest-tags';
    return prefix + url;
}

export default class PersonalDataTagsApi {
    public static async getUserTags() {
        const url = makeUrl('/get');
        return ResponseHandler(() => getRequestWithCredentials(url));
    }

    public static async updateUserTags(tag_key_list: string[]) {
        const url = makeUrl('/update');
        return ResponseHandler(() =>
            postRequestWithCredentials(url, {
                tag_key_list: tag_key_list,
            }),
        );
    }
}
