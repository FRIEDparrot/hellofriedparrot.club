"use strict";
exports.__esModule = true;
exports.sanitizeImageUrl = void 0;
exports.sanitizeImageUrl = function (rawUrl) {
    // format validation
    var isValid = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(rawUrl);
    if (!isValid)
        return '';
    try {
        var url = new URL(rawUrl);
        // only allow http and https protocols
        if (!['http:', 'https:'].includes(url.protocol))
            return '';
        // remove query and hash parameters (which can contain sensitive information)
        url.search = '';
        url.hash = '';
        return url.toString();
    }
    catch (_a) {
        return '';
    }
};
