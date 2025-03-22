/**
 * Description  Load image from url and return the promise of image url
 * @param {any} img:HTMLImageElement image element
 * @param {any} url:string  image url
 * @returns {Promise<string>} return the image object (Promise)
 */
export async function loadImage(url: string): Promise<HTMLElement> {
    const img = new Image(); // create new image element
    return new Promise((resolve, reject) => {
        img.src = url;
        img.onload = () => {
            resolve(img); // resolve with image object
        };
        img.onerror = () => {
            reject('Invalid image url');
        };
    });
}

export function checkImageFormat(url: string): boolean {
    const extensionMatch = url.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/i); // Matches valid image extensions
    if (extensionMatch) {
        return true;
    }
    return false;
}
