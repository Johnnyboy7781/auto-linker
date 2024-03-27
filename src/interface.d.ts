export interface LinkerApi {
    startLinker: (config: object) => void,
    stopLinker: () => void
}

declare global {
    interface Window {
        linkerApi: LinkerApi;
    }
}
