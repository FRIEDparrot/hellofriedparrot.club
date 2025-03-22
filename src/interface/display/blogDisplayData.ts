import InterestTag from '@/interface/classes/interestTag_cls';

export default interface IblogDisplayData {
    bannerImage: string | null;
    authorId: number /** used for direct to author's profile page */;
    authorName: string;
    authorAvatar: string | null;
    featured: boolean; // managers can set a post as featured
    title: string;
    abstract: string;
    tags: InterestTag[];
    viewsNum: number;
    starsNum: number;
    wordCount: number; // word count of the post
    publishTime: Date;
    lastModifyTime: Date;
    uuid: string;
    isPrivate: boolean; // managers can set a post as private
}

export interface IblogDispContentData extends IblogDisplayData {
    content: string; // content of the post
    commentsNum: number; // number of comments of the post
}
