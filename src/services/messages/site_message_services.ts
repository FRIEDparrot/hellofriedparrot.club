import { IsitemsgDisplayData } from '@/interface/display/sitemsgDisplayData'; // final display data
import { IresAccountBriefListItem } from '@/interface/requests/accouts_req';
import AccountsApi from '@/api/accounts/accounts_api';
import SiteMessagesApi from '@/api/site_messages/site_messages_api';
import { siteMessageInfo } from '@/interface/classes/siteMessage_cls';

const MSG_TYPE_MAP: { [key: number]: string } = {
    0: 'system_information',
    1: 'announcement',
    2: 'notification',
    3: 'user_message',
    4: 'comment',
};

export default class SiteMessageServices {
    /**
     * convert site message brief to breief display data
     */
    private static async convertToDisplayData(
        messages: siteMessageInfo[],
    ): Promise<IsitemsgDisplayData[]> {
        if (!messages.length) {
            return [];
        }
        const senderIds = [...new Set(messages.map((m) => m.from_id))];
        try {
            const senders = await AccountsApi.getAccountBriefList(senderIds);

            // use map to store the sender info
            const senderMap = new Map(senders.map((s) => [s.id, s]));

            return messages.map((msg: siteMessageInfo) => ({
                id: msg.id,
                msg_type: MSG_TYPE_MAP[msg.msg_type] || 'unknown',
                title: msg.title,
                content: msg.content,
                sender_name: senderMap.get(msg.from_id)?.name || '',
                sender_avatar: senderMap.get(msg.from_id)?.avatar || '',
                send_time: msg.send_time,
                is_read: msg.is_read,
            }));
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * get the display data of site messages
     * TODO : next version we may use pagination to get the messages list, not all at once
     * @param params
     */
    public static async getSiteMessageDisplayListInfo(): Promise<
        IsitemsgDisplayData[]
    > {
        try {
            const data: siteMessageInfo[] =
                await SiteMessagesApi.getUserSiteMessages();
            const displayData =
                await SiteMessageServices.convertToDisplayData(data);

            return Promise.resolve(displayData);
        } catch (error) {
            console.error('Failed to get message list:', error);
            return Promise.reject(error);
        }
    }
}
