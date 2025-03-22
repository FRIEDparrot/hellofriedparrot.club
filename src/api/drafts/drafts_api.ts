import {
    ResponseHandler,
    ResponseError,
    postRequestWithCredentials,
    getRequestWithCredentials,
    deleteRequestWithCredentials,
} from '@/api';

import {
    IstdDataTableUpdateParams,
    makeStdDataTableRequestParams,
    IstdDataTableRequestParams,
    IstdDataTableResponse,
} from '@/interface/tables/stdDataTableServer';

import {
    IresDraftContent,
    IreqBlogContent,
    IreqDraftContent,
    IresDraftBrief,
} from '@/interface/requests/blog_req';

function makeUrl(url: string) {
    const base_url = '/drafts';
    return `${base_url}${url}`;
}

export interface IreqSaveBlogDraft extends IreqDraftContent {}

export interface IreqPostBlogDraft extends IreqBlogContent {}

export default class DraftsApi {
    /**
     * Description get the list of user's blog drafts
     * @param {any} params:IStdDataTableServerParams
     * @returns {any} IStdTableDataResponse<IresGetUserDraftList>
     */
    public static async getUserDraftList(
        params: IstdDataTableUpdateParams,
    ): Promise<IstdDataTableResponse<IresDraftBrief>> {
        const url = makeUrl('/getlist-user');
        const param_request: IstdDataTableRequestParams =
            makeStdDataTableRequestParams(params);
        try {
            const response = await postRequestWithCredentials(
                url,
                param_request,
            );
            const data: IstdDataTableResponse<IresDraftBrief> = response.data;
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    public static async getUserDraftContent(
        uuid: string,
    ): Promise<IresDraftContent> {
        const url = makeUrl(`/content/${uuid}`);
        try {
            const response: any = await getRequestWithCredentials(url);
            return response.data as IresDraftContent;
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    public static async deleteUserDraft(uuid: string) {
        const url = makeUrl('/delete' + `/${uuid}`);
        return deleteRequestWithCredentials(url);
    }

    public static async saveBlogDraft(
        data: IreqSaveBlogDraft,
        uuid: string | null,
    ) {
        const url = makeUrl('/save');
        try {
            const response = await postRequestWithCredentials(url, data, {
                uuid: uuid,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }

    public static async publishBlogDraft(
        data: IreqPostBlogDraft,
        uuid: string,
    ) {
        const url = makeUrl('/publish');

        try {
            const response = await postRequestWithCredentials(url, data, {
                uuid: uuid,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error as ResponseError);
        }
    }
}
