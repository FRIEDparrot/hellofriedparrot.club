import { IresBlogBrief, IresBlogContent } from '@/interface/requests/blog_req';
import AccountsApi from '@/api/accounts/accounts_api';
import BlogsApi from '@/api/blogs/blogs_api';
import { IresAccountBriefListItem } from '@/interface/requests/accouts_req';
import { IstdDataTableRequestParams } from '@/interface/tables/stdDataTableServer';
import IblogDisplayData, {
    IblogDispContentData,
} from '@/interface/display/blogDisplayData';
import InterestTag from '@/interface/classes/interestTag_cls';
import cache from '@/store/cache';

interface IblogDisplayDataListInfo {
    data: IblogDisplayData[];
    count: number;
}

export default class BlogServices {
    /**
     * Description Make dispaly data iterator for blog list page,
     *     The display data iterator is type of IblogDisplayData[]
     *     map it to any data iterator you want to display in blog list page.
     * @param {any} data:IresBlogBrief[]
     * @returns {any}
     */
    public static async convertBlogToDisplayData(
        data: IresBlogBrief[],
    ): Promise<IblogDisplayData[]> {
        const author_id_set = new Set(data.map((item) => item.author_id));
        const allTagKeys = data.flatMap((item) => item.tags); // collect all tag keys
        const uniqueTagKeys = Array.from(new Set(allTagKeys));
        try {
            const author_info_list: IresAccountBriefListItem[] =
                await AccountsApi.getAccountBriefList(
                    Array.from(author_id_set),
                );
            await cache.dispatch('updateInterestByKeys', uniqueTagKeys);
            const cachedTags: InterestTag[] =
                cache.getters.getInterestTagByKeyList(uniqueTagKeys);

            // since different blogs may have different tags, we need to use map to get them.
            const tagMap = new Map(cachedTags.map((tag) => [tag.key, tag]));

            const disp_data: IblogDisplayData[] = data.map((item) => {
                const authorInfo = author_info_list.find(
                    (a) => a.id === item.author_id,
                );
                if (!authorInfo)
                    throw new Error(`Author ${item.author_id} not found`);
                return {
                    bannerImage: item.banner_image || null,
                    authorId: item.author_id,
                    authorName: authorInfo.name,
                    authorAvatar: authorInfo.avatar || null,
                    featured: item.featured,
                    title: item.title,
                    abstract: item.abstract || '',
                    tags: item.tags
                        .map((key) => tagMap.get(key))
                        .filter(Boolean) as InterestTag[],
                    viewsNum: item.view_count,
                    starsNum: item.star_count,
                    wordCount: item.word_count,
                    publishTime: item.publish_time,
                    lastModifyTime: item.last_modify_time,
                    uuid: item.uuid,
                    isPrivate: item.is_private,
                };
            });
            return Promise.resolve(disp_data);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    /**
     * Description Simple function to get blog display data list just like
     *      common getlist API function
     * @param {any} params:IstdTableDataRequest
     * @returns {any}
     */
    public static async getBlogDisplayDataListInfo(
        params: IstdDataTableRequestParams,
    ): Promise<IblogDisplayDataListInfo> {
        try {
            const response = await BlogsApi.getBlogList(params);
            const data = response.tableData as IresBlogBrief[];
            const disp_data: IblogDisplayData[] =
                await BlogServices.convertBlogToDisplayData(data);
            // return both full display data and total count
            return Promise.resolve({
                data: disp_data,
                count: response.count,
            } as IblogDisplayDataListInfo);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    public static async getBlogDisplayDataByUUID(
        uuid_list: string[],
    ): Promise<IblogDisplayData[]> {
        try {
            const data = await BlogsApi.getBlogListByUUIDList(uuid_list);
            const disp_data: IblogDisplayData[] =
                await BlogServices.convertBlogToDisplayData(data);
            // sort the display data by uuid list
            const dataMap = new Map<string, IblogDisplayData>();
            for (const blog of disp_data) {
                dataMap.set(blog.uuid, blog);
            }
            const data_res: IblogDisplayData[] = [];
            for (const uuid of uuid_list) {
                if (dataMap.has(uuid)) {
                    data_res.push(dataMap.get(uuid)!);
                }
            }
            // return only one display data,
            // since not a table query function, no need to return count
            return Promise.resolve(data_res);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Description get other information, and
     *      Convert blog brief data to display data
     * @param {any} data:IresBlogContent
     * @returns {any}
     */
    public static async getBlogContentDispData(
        data: IresBlogContent,
    ): Promise<IblogDispContentData> {
        try {
            const author_info_list = await AccountsApi.getAccountBriefList([
                data.author_id,
            ]);
            if (!author_info_list) {
                throw new Error(`Author ${data.author_id} not found`);
            }
            const author_info = author_info_list[0]; // assume there is only one author

            const tagKeys = Array.from(new Set(data.tags));
            await cache.dispatch('updateInterestByKeys', tagKeys);
            const cachedTags: InterestTag[] =
                cache.getters.getInterestTagByKeyList(tagKeys);

            const dispData: IblogDispContentData = {
                bannerImage: data.banner_image || null,
                authorId: data.author_id,
                authorName: author_info.name,
                authorAvatar: author_info.avatar || null,
                content: data.content,
                commentsNum: 0, // TODO: get comments number LATER when needed
                featured: data.featured,
                title: data.title,
                abstract: data.abstract || '',
                tags: cachedTags,
                viewsNum: data.view_count,
                starsNum: data.star_count,
                wordCount: data.word_count,
                publishTime: data.publish_time,
                lastModifyTime: data.last_modify_time,
                uuid: data.uuid,
                isPrivate: data.is_private,
            };
            return Promise.resolve(dispData);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}
