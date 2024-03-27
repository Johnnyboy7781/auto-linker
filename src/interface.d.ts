export interface LinkerApi {
    startLinker: () => void,
    stopLinker: () => void
}

declare global {
    interface Window {
        linkerApi: LinkerApi;
    }
}
