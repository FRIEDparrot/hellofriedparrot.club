declare module "gsap" {
    export * from "gsap/dist/gsap";
    // This export the entire gsap library as a single module
}

declare module "gsap/all" {
    export const gsap: typeof import("gsap");
}
