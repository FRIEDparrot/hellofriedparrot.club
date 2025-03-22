import { IresAccountBriefListItem } from '@/interface/requests/accouts_req';
import {
    postRequestWithCredentials,
    getRequestWithCredentials,
    ResponseError,
} from '@/api';

function makeUrl(url: string) {
    const base_url = '/accounts';
    return `${base_url}${url}`;
}

export interface IresAccountProfile {
    id: number;
    bio: string;
    name: string;
    email: string;
    priority: number;
    avatar: string;
    registerTime: Date;
    interest_tags: string[];
    following_num: number;
    followers_num: number;
    blogs_num: number;
    preferred_msg_lang: string;
}

export default class AccountsApi {
    static async getAccountBriefList(
        id_list: number[],
    ): Promise<IresAccountBriefListItem[]> {
        const url = makeUrl('/get-brief-list');
        try {
            const response = await postRequestWithCredentials(url, {
                id_list: id_list,
            });
            return Promise.resolve(response.data as IresAccountBriefListItem[]);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    static async getAccountProfile(
        user_id: number,
    ): Promise<IresAccountProfile> {
        const url = makeUrl('/profile/' + user_id.toString());
        try {
            const response = await getRequestWithCredentials(url);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }
}
