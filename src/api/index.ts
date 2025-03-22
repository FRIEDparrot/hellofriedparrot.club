import axios from 'axios';
import i18n from '@/locales/lang';
import { getPreferedLangCode } from '@/store';

/**
 * This File Contains the response Object and most common request and response handlers
 *
 * Rules :
 *     1. The api folder structure is same as the `blueprints` folder structure
 *          in the backend, with every folder specifies the url for convenience
 *
 *     2. If any request use lang_code specific response,
 *         it should add `lang` as a parameter in the request function.
 *         get it by `import { getPreferedLangCode } from "@/store";`
 *
 *     3. api layer just post or get data, request the url and return the response
 *             it not set store.state, or do any other logic.
 *             the state logic, etc, should be handled in "service" layer
 *
 *     4. naming : all of the functions should use camelCase method naming
 */
const request = axios.create({
    // use the  5000 port for the backend server,
    //      in production, change it to hellofriedparrot.club/api
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // global timeout for all requests
});

export default request;

export interface ResponseSucceess {
    succeed: boolean;
    data: any;
    message: string; // To be Implemented
    headers: any;
}

export interface ResponseError {
    error_code: number;
    message: string;
}

/**
 * @note we make a common request type handler here, for fit the
 *    response data format of the backend api.
 *
 * @important no need to  check (status code == 200) after request
 *      if use this as base
 */
export async function ResponseHandler<T>(
    reuqestFunc: () => Promise<T>,
): Promise<T> {
    try {
        const response: any = await reuqestFunc();
        // must have data property in response object.
        return Promise.resolve(response.data);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMsg =
                error.response?.data?.error?.message ??
                error.message ??
                (i18n.global as any).t('g.ServerdownError');
            const statusCode =
                error.response?.data?.error?.code ??
                error.response?.status ??
                error.status ??
                500;
            const res = {
                message: errorMsg,
                error_code: statusCode,
            } as ResponseError;
            return Promise.reject(res);
        } else {
            const res = {
                message:
                    error.message ||
                    (i18n.global as any).t('g.ServerUnknownError'),
                error_code: 500,
            } as ResponseError;
            // return a ResponseError object
            return Promise.reject(res);
        }
    }
}

/**
 * Description Standard get request handler
 * @param {any} url:string
 * @returns {any}
 */
export async function getRequest(url: string, params?: Record<string, any>) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

export async function getRequestWithCredentials(
    url: string,
    params?: Record<string, any>,
) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

/**
 * Description Standard post request handler
 * @param {any} url:string
 * @param {any} data:any
 * @returns {any}
 */
export async function postRequest(
    url: string,
    data: any,
    params?: Record<string, any>,
) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

/**
 * Description Standard post request with credentials handler
 *    note : only post request and take `use_cookies` tag
 * @param {any} url:string
 * @param {any} data:any
 * @returns {any}
 */
export async function postRequestWithCredentials(
    url: string,
    data: any,
    params?: Record<string, any>,
) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.post(url, JSON.stringify(data), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

export async function deleteRequest(url: string, params?: Record<string, any>) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

export async function deleteRequestWithCredentials(
    url: string,
    params?: Record<string, any>,
) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.delete(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
                lang: getPreferedLangCode(),
            },
        }),
    );
}

export async function patchRequestWithCredentials(
    url: string,
    data: any,
    params?: Record<string, any>,
) {
    return ResponseHandler<ResponseSucceess>(() =>
        request.patch(url, JSON.stringify(data), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    );
}
