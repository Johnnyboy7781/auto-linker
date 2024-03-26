export interface LinkerApi {
    test: (msg: string) => void
}

declare global {
    interface Window {
        linkerApi: LinkerApi;
    }
}
