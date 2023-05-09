import { ReactNode } from "react";

export interface LibraryConfig {
    displayName: string,
    logo?: ReactNode,
    indexName: string,
    algoliaApiUrl: string,
    extraBodyParams?: Record<string, any>
}