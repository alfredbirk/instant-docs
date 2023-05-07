import { ReactNode } from "react";

export interface LibraryConfig {
    displayName: string,
    logoPath: string,
    logo?: ReactNode,
    indexName: string,
    algoliaApiUrl: string,
    extraBodyParams?: Record<string, string>
}