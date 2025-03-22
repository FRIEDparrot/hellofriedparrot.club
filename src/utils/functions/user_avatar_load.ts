import store from "@store/index";
import i18n from "@lang/index";
import { loadImage } from "@functions/web_image_load";

const DefaultUserAvatorUrl = "/src/assets/imgs/ui/user-default.svg";

export function get_defalut_avatar(): any {
    try {
        const img = loadImage(DefaultUserAvatorUrl);
        return img;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function get_user_avatar(): any {
    const user_identity = store.state.user.identity;
    const avatar_url: string | null = store.state.user.avatarUrl;
    if (user_identity === "Guest" || avatar_url === null) {
        return get_defalut_avatar();
    }
    try {
        const img: any = loadImage(avatar_url);
        return img;
    } catch (error) {
        console.error("failed to load user avator: ", error);
        return get_defalut_avatar();
    }
}

export function get_user_avatar_url(): string {
    if (
        store.state.user.priority === 5 ||
        store.state.user.avatarUrl === null
    ) {
        return DefaultUserAvatorUrl;
    }
    try {
        loadImage(store.state.user.avatarUrl);
        return store.state.user.avatarUrl;
    } catch (error) {
        console.error("failed to load user avator: ", error);
        return DefaultUserAvatorUrl;
    }
}
