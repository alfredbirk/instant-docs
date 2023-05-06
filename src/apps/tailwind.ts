import { AppConfig } from "../models"

export const tailwind: AppConfig = {
    displayName: "Tailwind",
    logoPath: "src/logos/tailwind.svg",
    indexName: "tailwindcss",
    algoliaApiUrl: "https://knpxzi5b0m-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.2)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.27)%3B%20docsearch-react%20(1.0.0-alpha.27)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=5fc87cef58bb80203d2207578309fab6&x-algolia-application-id=KNPXZI5B0M",
    extraBodyParams: {
        "facetFilters":"version:v3",
    }
}

export const reactApp: AppConfig = {
    displayName: "React",
    logoPath: "src/logos/tailwind.svg",
    indexName: "beta-react",
    algoliaApiUrl: "https://1fcf9ayyat-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.12.0)%3B%20Browser%20(lite)%3B%20docsearch%20(3.0.0-alpha.41)%3B%20docsearch-react%20(3.0.0-alpha.41)&x-algolia-api-key=e8451218980a351815563de007648b00&x-algolia-application-id=1FCF9AYYAT",
    extraBodyParams: {}
}

export const typescript: AppConfig = {
    displayName: "Typescript",
    logoPath: "src/logos/tailwind.svg",
    indexName: "typescriptlang",
    algoliaApiUrl: "https://bgcdyoiyz5-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Bdocsearch.js%202.6.3&x-algolia-application-id=BGCDYOIYZ5&x-algolia-api-key=37ee06fa68db6aef451a490df6df7c60",
    extraBodyParams: {}
}

export const express: AppConfig = {
    displayName: "Express js",
    logoPath: "src/logos/tailwind.svg",
    indexName: "expressjs",
    algoliaApiUrl: "https://bh4d9od16a-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Bdocsearch.js%202.6.3&x-algolia-application-id=BH4D9OD16A&x-algolia-api-key=7164e33055faa6ecddefd9e08fc59f5d",
    extraBodyParams: {
        "facetFilters": '["lang:en"]'
    }
}

export const meteor: AppConfig = {
    displayName: "Meteor",
    logoPath: "src/logos/tailwind.svg",
    indexName: "meteor",
    algoliaApiUrl: "https://bh4d9od16a-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Bdocsearch.js%202.6.3&x-algolia-application-id=BH4D9OD16A&x-algolia-api-key=85d8a989beb6790642e6edd6ea380788",
    extraBodyParams: {}
}

export const moment: AppConfig = {
    displayName: "Moment js",
    logoPath: "src/logos/tailwind.svg",
    indexName: "momentjs",
    algoliaApiUrl: "https://bh4d9od16a-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Bdocsearch.js%202.6.3&x-algolia-application-id=BH4D9OD16A&x-algolia-api-key=46b499f4c91f1c0382073dc182b3dcfa",
    extraBodyParams: {}
}

export const laravel: AppConfig = {
    displayName: "Laravel",
    logoPath: "src/logos/tailwind.svg",
    indexName: "laravel",
    algoliaApiUrl: "https://e3mirnpjh5-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.8.5)%3B%20Browser%20(lite)%3B%20docsearch%20(3.3.3)%3B%20docsearch-react%20(3.3.3)%3B%20docsearch.js%20(3.3.3)&x-algolia-api-key=1fa3a8fec06eb1858d6ca137211225c0&x-algolia-application-id=E3MIRNPJH5",
    extraBodyParams: {
        facetFilters: '["version:10.x"]'
    }
}

export const webpack: AppConfig = {
    displayName: "Webpack",
    logoPath: "src/logos/tailwind.svg",
    indexName: "webpack-js-org",
    algoliaApiUrl: "https://bh4d9od16a-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.10.3)%3B%20Browser%20(lite)%3B%20docsearch%20(3.0.0-alpha.50)%3B%20docsearch-react%20(3.0.0-alpha.50)&x-algolia-api-key=fac401d1a5f68bc41f01fb6261661490&x-algolia-application-id=BH4D9OD16A",
    extraBodyParams: {}
}

export const babel: AppConfig = {
    displayName: "Babel",
    logoPath: "src/logos/tailwind.svg",
    indexName: "babeljs",
    algoliaApiUrl: "https://m7kgjdk6wf-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.14.3)%3B%20Browser%20(lite)%3B%20docsearch%20(3.3.2)%3B%20docsearch-react%20(3.3.2)%3B%20docusaurus%20(2.4.0)&x-algolia-api-key=6ec7d6acbfb6ed3520846a7517533c28&x-algolia-application-id=M7KGJDK6WF",
    extraBodyParams: {}
}

export const nuxt: AppConfig = {
    displayName: "Nuxt js",
    logoPath: "src/logos/tailwind.svg",
    indexName: "nuxtjs",
    algoliaApiUrl: "https://1v8g7n9gf0-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.28)%3B%20docsearch-react%20(1.0.0-alpha.28)%3B%20docsearch.js%20(1.0.0-alpha.28)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=60a01900a4b726d667eab75b6f337592&x-algolia-application-id=1V8G7N9GF0",
    extraBodyParams: {
        facetFilters: '["language:en-US","tags:main"]'
    }
}

export const nest: AppConfig = {
    displayName: "Nest js",
    logoPath: "src/logos/tailwind.svg",
    indexName: "nestjs",
    algoliaApiUrl: "https://sdcbyan96j-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.8.5)%3B%20Browser%20(lite)%3B%20docsearch%20(3.3.4)%3B%20docsearch-react%20(3.3.4)%3B%20docsearch.js%20(3.3.4)&x-algolia-api-key=6d1869890dab96592b191e63a8deb5b5&x-algolia-application-id=SDCBYAN96J",
    extraBodyParams: {}
}

export const jest: AppConfig = {
    displayName: "Jest",
    logoPath: "src/logos/tailwind.svg",
    indexName: "jest-v2",
    algoliaApiUrl: "https://hp439uusol-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.17.0)%3B%20Browser%20(lite)%3B%20docsearch%20(3.3.3)%3B%20docsearch-react%20(3.3.3)%3B%20docusaurus%20(2.4.0)&x-algolia-api-key=e5e670fd16f8f17caada79d6b0931682&x-algolia-application-id=HP439UUSOL",
    extraBodyParams: {
        facetFilters: '["language:en",["docusaurus_tag:default","docusaurus_tag:docs-default-29.5"]]'
    }
}

export const playwright: AppConfig = {
    displayName: "Playwright",
    logoPath: "src/logos/tailwind.svg",
    indexName: "playwright-nodejs",
    algoliaApiUrl: "https://k09icmcv6x-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.16.0)%3B%20Browser%20(lite)%3B%20docsearch%20(3.3.3)%3B%20docsearch-react%20(3.3.3)%3B%20docusaurus%20(2.4.0)&x-algolia-api-key=a5b64422711c37ab6a0ce4d86d16cdd9&x-algolia-application-id=K09ICMCV6X",
    extraBodyParams: {
        facetFilters: '["language:en",["docusaurus_tag:default","docusaurus_tag:docs-community-current","docusaurus_tag:docs-default-stable"]]"}]}'
    }
}

export default tailwind