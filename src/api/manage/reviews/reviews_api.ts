import { ResponseHandler, postRequestWithCredentials } from '@/api';

export interface IStdAcceptReviewParams {
    accept: boolean;
    id_list: number[];
    sendMsg: boolean;
    message?: string;
}

export default class ReviewsApi {
    /**
     * Description : Accept or reject reviews in the review table
     * @param {any} params:IStdAcceptReviewParams
     * @param {any} acceptReviewUrl:string
     * @param {any} rejectReviewUrl:string
     * @returns {any}
     */
    static async acceptReviewTable({
        params,
        acceptReviewUrl,
        rejectReviewUrl,
    }: {
        params: IStdAcceptReviewParams;
        acceptReviewUrl: string;
        rejectReviewUrl: string;
    }) {
        const { accept, id_list, sendMsg, message } = params;
        const data = {
            idList: id_list,
            informUser: sendMsg,
            reason: message, // consisitetwith
        };
        return ResponseHandler(() =>
            postRequestWithCredentials(
                accept ? acceptReviewUrl : rejectReviewUrl,
                data,
            ),
        );
    }
}
