// basic interface of site message
export interface BaseSiteMessage {
    msg_type: number; // message type
    title: string;
    content: string;
}

export interface siteMessageInfo extends BaseSiteMessage {
    id: number; // message id
    from_id: number;
    is_read: boolean;
    send_time: Date;
    msg_type: number;
}
