import {
    ResponseHandler,
    ResponseError,
    postRequestWithCredentials,
    getRequestWithCredentials,
    deleteRequestWithCredentials,
} from '@/api';

function makeUrl(url: string) {
    const base_url = '/history';
    return `${base_url}${url}`;
}

import HistoryRecord from '@/interface/classes/historyRecord_cls';

export interface IreqAddHistoryRecord {
    type: string;
    uuid: string;
    progress: number;
}

export interface IresGetHistoryRecords {
    records: HistoryRecord[];
}

export default class HistoryApi {
    /**
     * Add a history record.
     * @param {RequestHistoryRecord} data The history record data to be added.
     * @returns {Promise<any>} A promise that resolves with the response data.
     */
    public static async addHistoryRecord(
        data: IreqAddHistoryRecord,
    ): Promise<any> {
        const url = makeUrl('/add');
        try {
            const response = await postRequestWithCredentials(url, data);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    /**
     * Fetch the user's history records.
     * @returns {Promise<any>} A promise that resolves with the user's history records.
     */
    public static async getHistoryRecords(): Promise<IresGetHistoryRecords> {
        const url = makeUrl('/get');
        try {
            const response = await getRequestWithCredentials(url);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    /**
     * Delete all history records for the user.
     * @returns {Promise<any>} A promise that resolves when the deletion is successful.
     */
    public static async deleteAllHistory(): Promise<any> {
        const url = makeUrl('/delete_all');
        try {
            const response = await deleteRequestWithCredentials(url);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }
}
