import {
    IstdDataTableRequestParams,
    IstdDataTableResponse,
} from '@/interface/tables/stdDataTableServer';
import {
    ResponseHandler,
    postRequestWithCredentials,
    getRequestWithCredentials,
    deleteRequestWithCredentials,
    patchRequestWithCredentials,
} from '@/api';

import {
    IreqBlogContent,
    IreqDraftContent,
    IresDraftContent,
    IresBlogContent,
    IresBlogBrief,
} from '@/interface/requests/blog_req';

function makeUrl(url: string) {
    const base_url = '/blogs';
    return `${base_url}${url}`;
}

export default class BlogsApi {
    /**
     * Description get blog list by table data request params
     * @param {any} params:IstdDataTableRequestParams
     * @returns {any}
     */
    static async getBlogList(
        params: IstdDataTableRequestParams,
    ): Promise<IstdDataTableResponse<IresBlogBrief>> {
        const url = makeUrl('/getlist');
        const response: any = ResponseHandler(() =>
            postRequestWithCredentials(url, params),
        );
        return response;
    }
    /**
     * Description Used for  get blog in history and record
     * @param {any} uuid_list:string[]
     * @returns {any}
     */
    static async getBlogListByUUIDList(
        uuid_list: string[],
    ): Promise<IresBlogBrief[]> {
        const url = makeUrl('/getlist-uuid');
        try {
            const response = await postRequestWithCredentials(url, {
                uuid_list: uuid_list,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getUserBlogList(
        params: IstdDataTableRequestParams,
    ): Promise<IstdDataTableResponse<IresBlogBrief>> {
        const url = makeUrl('/getlist-user');
        try {
            const response = await postRequestWithCredentials(url, params);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getBlogContent(uuid: string): Promise<IresBlogContent> {
        const url = makeUrl(`/content/${uuid}`);
        try {
            const response = await getRequestWithCredentials(url);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getBlogUserContent(uuid: string) {
        const url = makeUrl(`/content-user/${uuid}`);
        return getRequestWithCredentials(url);
    }

    static async deleteBlog(uuid: string) {
        const url = makeUrl(`/delete/${uuid}`);
        return deleteRequestWithCredentials(url);
    }

    static async reSubmitBlog(uuid: string, data: IreqBlogContent) {
        const url = makeUrl(`/resubmit/${uuid}`);
        return () => postRequestWithCredentials(url, {});
    }

    static async setBlogFeatured(uuid: string, featured: boolean) {
        const url = makeUrl(`/set-featured`);
        return patchRequestWithCredentials(url, {
            uuid: uuid,
            featured: featured,
        });
    }

    static async getBlogReviewContent(uuid: string): Promise<IresBlogContent> {
        const url = makeUrl(`/review/content/${uuid}`);
        try {
            const response = await getRequestWithCredentials(url);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

// export async function updateBlog(data: any) {
//     const url = makeUrl('/update');
//     return ResponseHandler(() => postRequestWithCredentials(url, data));
// }
