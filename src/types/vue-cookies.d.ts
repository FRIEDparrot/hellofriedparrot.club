declare module "vue-cookies" {
    interface VueCookies {
        set(
            key: string,
            value: any,
            expire?: string | number,
            path?: string,
            domain?: string,
            secure?: boolean,
        ): void;
        get(key: string): any;
        remove(key: string, path?: string, domain?: string): void;
        isKey(key: string): boolean;
        keys(): string[];
    }

    const VueCookies: VueCookies;

    export default VueCookies;
}
