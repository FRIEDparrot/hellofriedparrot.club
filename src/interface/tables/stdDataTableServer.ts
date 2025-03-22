export interface IstdDataTableServer<T = any> {
    headers: {
        titleKey?: string;
        title?: string;
        key: string;
        align?: string;
        sortable?: boolean;
        searchable?: boolean;
        isTimeColumn?: boolean;
        // for time column, we would automatically convert it to local time zone
    }[];
    selected: number[]; // automatically set by v-model
    itemsPerPage: string | number; // set it in @update:options event
    items: T[];
    itemsLength: string | number; // set it in @update:items event
    sortBy: any[]; // set it in @update:items event
    loading: boolean;
    page: number; // set it in @update:items event
    pageText: string; // no use
}

export function makeStdDataTableServer<T = any>(
    headers: {
        titleKey?: string;
        title?: string;
        key: string;
        align?: string;
        sortable?: boolean;
        searchable?: boolean;
        isTimeColumn?: boolean;
    }[],
    itemsPerPage: string | number = 10,
): IstdDataTableServer<T> {
    return {
        headers: headers,
        selected: [],
        itemsPerPage: 10,
        items: [],
        itemsLength: 0,
        sortBy: [],
        loading: false,
        page: 1,
        pageText: '0-0 of 0',
    };
}

export interface fetchTableDataParams {
    page: number;
    itemsPerPage: number;
    sortBy: any[];
}

/****************** DataFetch and Requst Parameter Conversion ***********************/

/**
 * Description
 *    standard DataTable request ===input parameters=== object
 *
 *    used in stdDataTable object
 * @param {any} pageNum:number
 * @param {any} itemsPerPage:number
 * @param {any} orderBy:string|null
 * @param {any} order:string|null
 * @param {any} searchKey:string|null=null
 * @param {any} search:string|null=null
 * @returns {any}
 */
export interface IstdDataTableUpdateParams {
    pageNum: number;
    itemsPerPage: number;
    orderBy?: string;
    order?: string;
    searchKey?: string;
    search?: string;
}

/**
 * Description
 *    standard DataTableServer parameter for backend server api request
 *    used in stdDataTableServer object
 * @param {any} page:number
 * @param {any} itemsPerPage:number
 * @param {any} sortBy:any[]
 * @returns {any}
 * @note : use makeStdTableDataRequest to generate this object from stdDataTableServerParams
 */
export interface IstdDataTableRequestParams {
    start: number;
    cnt: number;
    filters?: { [key: string]: any };
    order?: string;
    order_by?: string;
}

/**
 * Description Generate std TableDataRequest object from std ReviewTableParams object
 * @param {any} params:ReviewTableParams
 * @returns {any}
 */
export function makeStdDataTableRequestParams(
    params: IstdDataTableUpdateParams,
): IstdDataTableRequestParams {
    const { pageNum, itemsPerPage, orderBy, order, searchKey, search } = params;
    const data: IstdDataTableRequestParams = {
        start: (pageNum - 1) * itemsPerPage,
        cnt: itemsPerPage,
        filters: {},
        order_by: orderBy ?? undefined,
        order: order ?? undefined,
    };
    // update filters by searchKey and search
    if (data.filters !== undefined) {
        if (searchKey && search) {
            data.filters[searchKey] = search;
        }
    }
    return data;
}

export interface IstdDataTableResponse<T> {
    count: number;
    tableData: T[];
}
