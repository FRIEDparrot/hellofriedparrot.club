import { createStore } from 'vuex';
import InterestTag from '@/interface/classes/interestTag_cls';
import InterestTagApi from '@/api/interest_tags/interest_tags_api';

const cache = createStore({
    state: {
        interest_tag_cache: [] as InterestTag[],
        author_brief_cache: {} as any,
    },
    mutations: {
        setInterestTagCache(state, tags: InterestTag[]) {
            // filter the existing tags to avoid duplication
            const newTags = tags
                .filter((tag) => typeof tag === 'object' && tag !== null)
                .filter(
                    (tag) =>
                        !state.interest_tag_cache.some(
                            (cachedTag) => cachedTag.key === tag.key,
                        ),
                );
            state.interest_tag_cache.push(...newTags); // push new tags to the end of the cache
        },
        addInterestTagsToCache(state, tags: InterestTag[]) {
            const cachedKeys = new Set(
                state.interest_tag_cache.map((tag) => tag.key),
            );
            // filter the new tags and avoid duplication
            const newTags = tags
                .filter(
                    (tag, index, self) =>
                        !cachedKeys.has(tag.key) &&
                        self.findIndex((t) => t.key === tag.key) === index,
                )
                .filter((tag) => typeof tag === 'object' && tag !== null);
            state.interest_tag_cache.unshift(...newTags); // push new tags to the beginning of the cache
        },
    },
    getters: {
        getInterestTag(state) {
            return state.interest_tag_cache;
        },
        getInterestTagByKey: (state) => (key: string) => {
            return state.interest_tag_cache.find((tag) => tag.key === key);
        },
        getInterestTagByTransList:
            (state) => (lang: string, trans_list: string[]) => {
                return trans_list.map((trans) =>
                    state.interest_tag_cache.find((tag) => tag[lang] === trans),
                );
            },
        getInterestTagByKeyList: (state) => (key_list: string[]) => {
            return key_list.map((key) =>
                state.interest_tag_cache.find((tag) => tag.key === key),
            );
        },
    },
    actions: {
        /**
         * Description Update Interest Tag Cache by keys list
         * @param {any} {commit
         * @param {any} state}
         * @param {any} key_list:string[]
         * @returns {any}
         */
        async updateInterestByKeys(
            { commit, state },
            key_list: string[],
        ): Promise<any> {
            const cached_keys = state.interest_tag_cache.map((tag) => tag.key);
            const new_keys = key_list
                .filter((key) => typeof key === 'string' && key !== '')
                .filter((key) => !cached_keys.includes(key));

            if (new_keys.length === 0) {
                return Promise.resolve('update interest tags cache');
            }
            try {
                // for new tags, fetch from backend and cache them
                const response: any =
                    await InterestTagApi.getTagByKeys(new_keys);
                const newTags: InterestTag[] = response;
                commit('setInterestTagCache', newTags);
                return Promise.resolve('update interest tags cache');
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
});

export default cache;
