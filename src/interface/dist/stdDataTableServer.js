"use strict";
exports.__esModule = true;
exports.makeStdTableDataRequest = exports.makeStdDataTableServer = void 0;
function makeStdDataTableServer(headers, itemsPerPage) {
    if (itemsPerPage === void 0) { itemsPerPage = 10; }
    return {
        headers: headers,
        selected: [],
        itemsPerPage: 10,
        items: [],
        itemsLength: 0,
        sortBy: [],
        loading: false,
        page: 1,
        pageText: "0-0 of 0"
    };
}
exports.makeStdDataTableServer = makeStdDataTableServer;
/**
 * Description Generate std TableDataRequest object from std ReviewTableParams object
 * @param {any} params:ReviewTableParams
 * @returns {any}
 */
function makeStdTableDataRequest(params) {
    var pageNum = params.pageNum, itemsPerPage = params.itemsPerPage, orderBy = params.orderBy, order = params.order, searchKey = params.searchKey, search = params.search;
    var data = {
        start: (pageNum - 1) * itemsPerPage,
        cnt: itemsPerPage,
        filters: {},
        order_by: orderBy !== null && orderBy !== void 0 ? orderBy : undefined,
        order: order !== null && order !== void 0 ? order : undefined
    };
    // update filters by searchKey and search
    if (searchKey && search) {
        data.filters[searchKey] = search;
    }
    return data;
}
exports.makeStdTableDataRequest = makeStdTableDataRequest;
