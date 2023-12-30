import * as React from "react";
import "./App.css";
import { useState, useEffect, useRef } from "react";

import { ReactComponent as Logo } from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faHashtag, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "usehooks-ts";
import { getFlattenedItems, useKeyPress } from "./utils";
import cn from "classnames";
import librariesFromFile from "./libraries"
import { MantineProvider, Select } from '@mantine/core';
import { LibraryConfig } from "./models";

interface vscode {
	postMessage(message: any): void;
}

declare const acquireVsCodeApi: Function;
// Fetch the api object
const vscodeApi = acquireVsCodeApi();

const App = () => {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce<string>(query, 100);
	const [iframeUrl, setIframeUrl] = useState("");
	const [items, setItems] = useState<any>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [libraries, setLibraries] = useState<LibraryConfig[]>([]);
	const [selectedLibrary, setSelectedLibrary] = useState<LibraryConfig | undefined>(undefined);

	/////////////////////
	// Keyboard navigation
	const [selected, setSelected] = useState<any>(undefined);
	const downPress = useKeyPress("ArrowDown");
	const upPress = useKeyPress("ArrowUp");
	const enterPress = useKeyPress("Enter");
	const [cursor, setCursor] = useState<any>(0);
	const [hovered, setHovered] = useState(undefined);
	useEffect(() => {
		if (items.length && downPress) {
			setCursor((prevState: any) => (prevState < items.length - 1 ? prevState + 1 : prevState));
			inputRef.current?.blur()
		}
	}, [downPress]);
	useEffect(() => {
		if (items.length && upPress) {
			setCursor((prevState: any) => (prevState > 0 ? prevState - 1 : prevState));
			inputRef.current?.blur()
		}
	}, [upPress]);
	useEffect(() => {
		if (items.length && enterPress) {
			setSelected(cursor);
			inputRef.current?.blur()
		}
	}, [cursor, enterPress]);
	useEffect(() => {
		if (items.length && hovered !== undefined) {
			setCursor(hovered);
			inputRef.current?.blur()
		}
	}, [hovered]);
	useEffect(() => {
		const selectedItem = items.find((item: any) => item.id === selected);
		if (selectedItem && selectedItem.url) {
			handleSetIframeUrl(selectedItem.url);
		}
	}, [selected]);
	/////////////////////

	useEffect(() => {
		if (query) {
			vscodeApi.postMessage({ command: "query", value: query, library: JSON.stringify(selectedLibrary) });
		}
	}, [debouncedQuery]);

	const onInput = (e: any) => {
		const element = e.currentTarget as HTMLInputElement;
		const value = element.value;

		setQuery(value);
	};

	useEffect(() => {
		window.addEventListener("message", (message) => {
			switch (message.data.command) {
				case "recentlyUsedDocs":
					const recentlyUsedDocs = message.data.recentlyUsedDocs
					const sortedLibraries = librariesFromFile.sort((a, b) => {
						const aIndex = recentlyUsedDocs.indexOf(a.indexName) === -1 ? 1000 : recentlyUsedDocs.indexOf(a.indexName)
						const bIndex = recentlyUsedDocs.indexOf(b.indexName) === -1 ? 1000 : recentlyUsedDocs.indexOf(b.indexName)
						return aIndex - bIndex;
					})
					setLibraries(sortedLibraries)
					break;
				case "queryResults":
					const hits = message.data.results[0].hits;
					const flattenedItems = getFlattenedItems(hits);
					setItems(flattenedItems)
				default:
					break;
			}
		})

		// Disable scrolling with arrow keys
		window.addEventListener("keydown", function (e) {
			if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
				e.preventDefault();
			}
		}, false);
	}, []);

	const handleSetIframeUrl = (url: string) => {
		if (selectedLibrary) {
			vscodeApi.postMessage({ command: "openDocs", libraryIndexName: selectedLibrary.indexName, type: selectedLibrary.type, url });
			if (selectedLibrary.type !== "openInBrowser") {
				setIframeUrl(url);
			}
		}
	}

	if (iframeUrl) {
		return (
			<div style={{ height: "100vh", background: "white" }}>
				<iframe width="100%" height="100%" src={iframeUrl} title="Instant Docs"></iframe>
			</div>
		);
	}

	if (!libraries) {
		return <></>
	}

	const renderItem = (item: any) => {
		switch (item.lvl) {
			case 0:
				return <h3 className="lvl0" dangerouslySetInnerHTML={{ __html: item.name }} />;
			case 1:
				if (item.isHighestLvl) {
					return (
						<div
							onClick={() => handleSetIframeUrl(item.url)}
							className={cn("item-container", { "item-container-hover": cursor === item.id })}
							onMouseEnter={() => setHovered(item.id)}
							onMouseLeave={() => setHovered(undefined)}
						>
							<div>
								<span className={cn("icon-container", { "icon-container-hover": cursor === item.id })}>
									<FontAwesomeIcon icon={faHashtag} />
								</span>
								<span className="element-name" dangerouslySetInnerHTML={{ __html: item.highlightResult }} />
							</div>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					);
				} else {
					return (
						<div
							onClick={() => handleSetIframeUrl(item.url)}
							className={cn("item-container", { "item-container-hover": cursor === item.id })}
							onMouseEnter={() => setHovered(item.id)}
							onMouseLeave={() => setHovered(undefined)}
						>
							<div>
								<span className={cn("icon-container", { "icon-container-hover": cursor === item.id })}>
									<FontAwesomeIcon icon={faBookOpen} />
								</span>
								<span className="element-name" dangerouslySetInnerHTML={{ __html: item.highlightResult }} />
							</div>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					);
				}
				break;
			case 2:
				if (item.isHighestLvl) {
					return (
						<div
							onClick={() => handleSetIframeUrl(item.url)}
							className={cn("item-container lvl2-and-lvl3", { "item-container-hover": cursor === item.id })}
							onMouseEnter={() => setHovered(item.id)}
							onMouseLeave={() => setHovered(undefined)}
						>
							<div className="vert">
								<span className={cn("icon-container", { "icon-container-hover": cursor === item.id })}>
									<FontAwesomeIcon icon={faHashtag} />
								</span>
								<span className="element-name" dangerouslySetInnerHTML={{ __html: item.highlightResult }} />
							</div>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					);
				}
				break;
			case 3:
				if (item.isHighestLvl) {
					return (
						<div
							onClick={() => handleSetIframeUrl(item.url)}
							className={cn("item-container lvl2-and-lvl3", { "item-container-hover": cursor === item.id })}
							onMouseEnter={() => setHovered(item.id)}
							onMouseLeave={() => setHovered(undefined)}
						>
							<div className="vert">
								<span className={cn("icon-container", { "icon-container-hover": cursor === item.id })}>
									<FontAwesomeIcon icon={faHashtag} />
								</span>
								<span className="element-name" dangerouslySetInnerHTML={{ __html: item.highlightResult }} />
							</div>
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					);
				}
				break;
			default:
				break;
		}
	};

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'dark',
			}}
		>
			<div className="App">
				<div className="App-header">
					<Logo width="2rem" height="2rem" fill="none" stroke="white" />
					<h3 style={{ marginLeft: "1rem" }}>Instant Docs</h3>
				</div>
				<div className="modal">
					<div className="inner-container">
						<div className="select-container">
							<span className="select-label">Documentation for</span>
							<Select
								placeholder="Pick one"
								searchable
								data={libraries.map(lib => lib.displayName)}
								initiallyOpened
								hoverOnSearchChange
								autoFocus
								selectOnBlur
								dropdownComponent="div"
								onChange={(value) => {
									setSelectedLibrary(libraries.find(lib => lib.displayName === value))
									setTimeout(() => {
										inputRef.current?.focus()
									}, 0);
								}}
							/>
						</div>
						<div className="search-container">
							<label className="DocSearch-MagnifierLabel" htmlFor="docsearch-input" id="docsearch-label">
								<svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
									<path
										d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
										stroke="currentColor"
										fill="none"
										fill-rule="evenodd"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</svg>
							</label>
							<input
								ref={inputRef}
								onInput={onInput}
								className="DocSearch-Input"
								aria-autocomplete="list"
								aria-labelledby="docsearch-label"
								id="docsearch-input"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								placeholder="Search"
								type="search"
								value={query}
							/>
						</div>
						{items.length > 0 && items.map((item: any) => renderItem(item))}
					</div>
				</div>
			</div>
		</MantineProvider>
	);
};

export default App;
