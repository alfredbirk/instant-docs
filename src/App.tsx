// @ts-nocheck
import * as React from "react";
import "./App.css";
import { useState, useEffect } from "react";

import logo from "./logos/tailwind.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faHashtag, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "usehooks-ts";
import { getFlattenedItems, useKeyPress } from "./utils";
import cn from "classnames";
import appConfig from "./apps/tailwind"

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
	const [items, setItems] = useState([]);

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
		}
	}, [downPress]);
	useEffect(() => {
		if (items.length && upPress) {
			setCursor((prevState: any) => (prevState > 0 ? prevState - 1 : prevState));
		}
	}, [upPress]);
	useEffect(() => {
		if (items.length && enterPress) {
			setSelected(cursor);
		}
	}, [cursor, enterPress]);
	useEffect(() => {
		if (items.length && hovered !== undefined) {
			setCursor(hovered);
		}
	}, [hovered]);
	useEffect(() => {
		const selectedItem = items.find((item) => item.id === selected);
		if (selectedItem && selectedItem.url) {
			setIframeUrl(selectedItem.url);
		}
	}, [selected]);
	/////////////////////

	useEffect(() => {
		if (query) {
			vscodeApi.postMessage({ command: "query", value: query });
		}
	}, [debouncedQuery]);

	const onInput = (e: any) => {
		const element = e.currentTarget as HTMLInputElement;
		const value = element.value;

		setQuery(value);
	};

	useEffect(() => {
		window.addEventListener("message", (message) => {
			const hits = message.data[0].hits;
			const flattenedItems = getFlattenedItems(hits);
			setItems(flattenedItems)
	})}, []);

	if (iframeUrl) {
		return (
			<div style={{ height: "100vh" }}>
				<iframe width="100%" height="100%" src={iframeUrl} title={`${appConfig.displayName} documentation`}></iframe>
			</div>
		);
	}

	const renderItem = (item) => {
		switch (item.lvl) {
			case 0:
				return <h3 className="lvl0" dangerouslySetInnerHTML={{ __html: item.name }} />;
			case 1:
				if (item.isHighestLvl) {
					return (
						<div
							onClick={() => setIframeUrl(item.url)}
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
							onClick={() => setIframeUrl(item.url)}
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
							onClick={() => setIframeUrl(item.url)}
							className={cn("item-container lvl2-and-lvl3", { "item-container-hover": cursor === item.id })}
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
				}
				break;
			case 3:
				if (item.isHighestLvl) {
					return (
						<div
							onClick={() => setIframeUrl(item.url)}
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
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h3>{appConfig.displayName} documentation</h3>
			</div>

			<div className="modal">
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
						onInput={onInput}
						className="DocSearch-Input"
						aria-autocomplete="list"
						aria-labelledby="docsearch-label"
						id="docsearch-input"
						autoFocus
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						placeholder="Search"
						type="search"
						value={query}
					/>
				</div>
			</div>

			{items.length > 0 && items.map((item: any) => renderItem(item))}
		</div>
	);
};

export default App;
