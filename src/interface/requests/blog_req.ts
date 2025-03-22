export interface IreqDraftContent {
    title: string;
    content: string;
    tag_keys: string[]; // tag keys string array[]
    theme: string;
}

export interface IreqBlogContent extends IreqDraftContent {
    abstract: string | null;
    banner_url: string | null;
}

export interface IresDraftBrief {
    author_id: number;
    title: string;
    tags: string[];
    uuid: string;
    last_save_time: Date;
    theme: string;
}

export interface IresDraftContent extends IresDraftBrief {
    content: string; // tag keys string array[]
}

export interface IresBlogBrief {
    author_id: number;
    title: string;
    abstract: string | null;
    tags: string[]; // This is a string in your class, but you might want to change it to string[] if you handle tags as an array
    publish_time: Date;
    last_submit_time: Date;
    last_modify_time: Date;
    view_count: number;
    star_count: number;
    word_count: number;
    // comment_num : number;
    featured: boolean;
    theme: string;
    uuid: string;
    banner_image: string | null;
    reviewer_id: number | null; // reviewer id
    status: number; // 0 for rejected, 1 for reviewing, 2 for published
    is_private: boolean; // True if the blog is private
}

export interface IresBlogContent extends IresBlogBrief {
    content: string;
}
