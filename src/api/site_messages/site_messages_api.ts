import {
    ResponseHandler,
    postRequestWithCredentials,
    getRequestWithCredentials,
    patchRequestWithCredentials,
    ResponseError,
} from '@/api';

function makeUrl(path: string) {
    const prefix = '/site-messages';
    return `${prefix}${path}`;
}

import {
    BaseSiteMessage,
    siteMessageInfo,
} from '@/interface/classes/siteMessage_cls';

export interface IreqSendSiteMessages extends BaseSiteMessage {
    to_id_list: string[];
}

export default class SiteMessagesApi {
    public static async getUserSiteMessages(): Promise<siteMessageInfo[]> {
        const url = makeUrl(`/get`);
        try {
            const response = await getRequestWithCredentials(url);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async sendSiteMessages(data: IreqSendSiteMessages) {
        const url = makeUrl(`/send`);
        return postRequestWithCredentials(url, data);
    }

    public static async markSiteMessagesAsRead(messageIdList: number[]) {
        const url = makeUrl(`/mark-as-read`);
        return patchRequestWithCredentials(url, { id_list: messageIdList });
    }

    public static async markSiteMessagesAsUnread(messageIdList: number[]) {
        const url = makeUrl(`/mark-as-unread`);
        return patchRequestWithCredentials(url, { id_list: messageIdList });
    }

    public static async deleteSiteMessages(messageIdList: number[]) {
        const url = makeUrl(`/delete`);
        return patchRequestWithCredentials(url, { id_list: messageIdList });
    }
}
