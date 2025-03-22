import { check } from "prettier";

export function checkStringLength(
    str: string,
    min: number,
    max: number,
): boolean {
    return str.length >= min && str.length <= max;
}

/**
 * Description Basic email pattern check using regex pattern
 * @param {any} email:string
 * @returns {any} true if email pattern is valid, false otherwise
 */
export function checkEmailPattern(email: string): boolean {
    if (checkStringLength(email, 5, 200) === false) {
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

/**
 * Description Check the captcha pattern using regex pattern
 * @param {any} captcha:string
 * @returns {any} true if captcha pattern is valid, false otherwise
 */
export function checkCaptchaPattern(captcha: string): boolean {
    const captchaPattern = /^[A-Z0-9]{6}$/;
    return captchaPattern.test(captcha);
}

/**
 * Description
 * @param {any} username:string
 * @returns {any}
 *      -1: name length not between 2 to 20 characters
 *      -2: name starts with a number or underscore
 *      -3: name contains space or special characters
 *      0: valid username pattern
 */
export function checkUsernamePattern(username: string): number {
    if (!checkStringLength(username, 2, 20)) {
        return -1;
    }
    if (/^[0-9_]/.test(username)) {
        return -2; // if 1st character is not number or underscore the word cound not be pure number or special char
    }
    const forbiddenPattern = /[ &*@$#%^()+\-=\[\]{};':"\\|,.<>\/?~`]/;
    if (forbiddenPattern.test(username)) {
        return -3; // contains forbidden special character
    }
    return 0;
}

/**
 * Description Passsword pattern check
 *   - at least 1 letter, 1 digit, 1 special character, 8 to 20 characters long
 *   - not contain any language specific characters, can contain space
 * @param {string} str:string
 * @returns {number}
 *      -1: contain forbidden special character
 *      -2: invalid input (contain invalid characters)
 *      -3: no letter,
 *      -4: no digit,
 *      -5: no special character,
 *      -6: password length not between 8 to 20 characters,
 *       0: valid password pattern
 * @abstract: must use > 0 for check
 */
export function checkPasswordPattern(str: string): number {
    const letter = /[A-Za-z]/;
    const digit = /[0-9]/;
    const specialChar = /[ !@#$%^&*()_+\-={};,.?~]/;

    const forbiddenSpecialChar = /[:'"\\|\/<>`]/;
    const total_pattern = /^[a-zA-Z0-9 !@#$%^&*()\[\]_+\-={};,.?~]+$/;

    if (forbiddenSpecialChar.test(str)) {
        return -1; // contain forbidden special character
    }
    if (!total_pattern.test(str)) {
        return -2;
    }
    if (!letter.test(str)) {
        return -3;
    }
    if (!digit.test(str)) {
        return -4;
    }
    if (!specialChar.test(str)) {
        return -5;
    }
    if (!checkStringLength(str, 8, 20)) {
        return -6;
    }
    return 0; // valid password pattern
}
