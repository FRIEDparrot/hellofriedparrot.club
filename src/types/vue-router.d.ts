import "vue-router";

declare module "vue-router" {
    interface Router {
        $router: Router;
        $route: RouteRecord;
    }
}
