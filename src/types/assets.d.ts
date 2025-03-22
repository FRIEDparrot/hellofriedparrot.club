declare module "@imgs/*" {
    const value: string;
    export default value;
}

declare module "@store/*" {
    const value: any;
    export default value;
}
/*
tells TypeScript that whenever you import something from @imgs/, it should treat it as a string (the path to the image).
*/
