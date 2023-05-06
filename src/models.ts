export interface AppConfig {
    displayName: string,
    logoPath: string,
    indexName: string,
    algoliaApiUrl: string,
    extraBodyParams?: Record<string, string>
}