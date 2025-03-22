import { getPreferedLangCode } from '@/store';
import request, { ResponseHandler } from '@/api';

export default class RulesAppi {
    public static async getRuleList() {
        const lang_code = getPreferedLangCode();
        return ResponseHandler(() =>
            request.get('/rules/', { params: { lang: lang_code } }),
        );
    }

    public static async getRuleContent(filePath: string) {
        const lang_code = getPreferedLangCode();
        const totalPath = '/rules/' + filePath;
        const params = {
            lang: lang_code,
        };
        return ResponseHandler(() =>
            request.get(totalPath, { params: params }),
        );
    }
}
