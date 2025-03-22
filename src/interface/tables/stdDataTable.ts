export interface IstdDataTableHeader {
    titleKey: string;
    title?: string;
    key: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    searchable?: boolean;
}
