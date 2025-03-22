export const sanitizeImageUrl = (rawUrl: string): string => {
    // format validation
    const isValid = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(rawUrl);
    if (!isValid) return '';

    try {
        const url = new URL(rawUrl);
        // only allow http and https protocols
        if (!['http:', 'https:'].includes(url.protocol)) return '';
        // remove query and hash parameters (which can contain sensitive information)
        url.search = '';
        url.hash = '';
        return url.toString();
    } catch {
        return '';
    }
};
