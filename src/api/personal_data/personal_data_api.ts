import {
    ResponseHandler,
    postRequestWithCredentials,
    getRequestWithCredentials,
} from '@/api';

function makeUrl(url: string) {
    const prefix = '/personal-data';
    return `${prefix}${url}`;
}

export default class PersonalDataApi {
    public static async getPersonalData() {
        const url = makeUrl('/get');
        return ResponseHandler(() => getRequestWithCredentials(url));
    }
}
