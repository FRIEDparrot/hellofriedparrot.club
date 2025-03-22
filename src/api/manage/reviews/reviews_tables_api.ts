import { ResponseHandler, postRequestWithCredentials } from '@/api';
import {
    IstdDataTableUpdateParams,
    IstdDataTableRequestParams,
    IstdDataTableResponse,
    makeStdDataTableRequestParams,
} from '@/interface/tables/stdDataTableServer';
import ReviewsApi, {
    IStdAcceptReviewParams,
} from '@/api/manage/reviews/reviews_api';

/**
 * Review Table Data API
 * including ReviewTable RegisterTable AccountModTable
 *     and it's related functions
 */
function makeUrl(url: string) {
    const base_url = '/manage/reviews';
    return `${base_url}${url}`;
}

export default class ReviewsTablesApi {
    /**
     * Description
     * @param {any} params:IstdDataTableServerParams
     * @returns {any}
     */
    public static async getCommonReviewsTableData(
        params: IstdDataTableUpdateParams,
    ): Promise<any> {
        const data: IstdDataTableRequestParams =
            makeStdDataTableRequestParams(params);
        try {
            const response = await postRequestWithCredentials(
                makeUrl('/common-reviews/getlist'),
                data,
            );
            return response.data;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    /**
     * Description API for accept or reject review submission
     * @param {any} params:IStdAcceptReviewParams
     * @returns {any}
     */
    public static async acceptCommonReviews(params: IStdAcceptReviewParams) {
        return ReviewsApi.acceptReviewTable({
            params,
            acceptReviewUrl: makeUrl('/common-reviews/accept'),
            rejectReviewUrl: makeUrl('/common-reviews/reject'),
        });
    }

    /**
     * Description API for get part of the Resigtration table data from database
     */
    public static async getRegisterTableData(
        params: IstdDataTableUpdateParams,
    ) {
        const data = makeStdDataTableRequestParams(params);
        return ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/registration/getlist'), data),
        );
    }

    /**
     * Description consent or reject registration submission
     * @param {any} id:number
     * @param {any} accept:boolean
     * @returns {any}
     */
    public static async acceptRegister(params: IStdAcceptReviewParams) {
        return ReviewsApi.acceptReviewTable({
            params,
            acceptReviewUrl: makeUrl('/registration/accept'),
            rejectReviewUrl: makeUrl('/registration/reject'),
        });
    }

    public static async getAccountModsTableData(
        params: IstdDataTableUpdateParams,
    ) {
        const data = makeStdDataTableRequestParams(params);
        return ResponseHandler(() =>
            postRequestWithCredentials(makeUrl('/account-mods/getlist'), data),
        );
    }

    public static async acceptAccountMods(params: IStdAcceptReviewParams) {
        return ReviewsApi.acceptReviewTable({
            params,
            acceptReviewUrl: makeUrl('/account-mods/accept'),
            rejectReviewUrl: makeUrl('/account-mods/reject'),
        });
    }
}
