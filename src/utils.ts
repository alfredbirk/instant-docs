// @ts-nocheck

import { useEffect, useState } from "react";

const getNextLvl = (lvl: string) => {
    switch (lvl) {
        case "lvl3":
            return "lvl4";
        case "lvl2":
            return "lvl3";
        case "lvl1":
            return "lvl2";
        case "lvl0":
            return "lvl1";
        case "lvl4":
            return undefined;
        default:
            break;
    }
};

export const useKeyPress = (targetKey: any) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }: any) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const upHandler = ({ key }: any) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};

export type Node = {
    name: string;
    children: Node[];
    lvl: string;
    url: string;
    highlightResult: string;
}


export const getLvl0Nodes = (graph: any) => {
    let lvl0Nodes: any = [];
    for (const node of Object.values(graph)) {
        if (node.lvl === "lvl0") {
            lvl0Nodes.push(node)
        }
    }
    return lvl0Nodes
}



export const createHierarchyGraph = (hits: any) => {
    let graph: any = {};

    for (const hit of hits) {
        let currentNode: Node;
    
        if (hit.hierarchy["lvl0"] in graph) {
            currentNode = graph[hit.hierarchy["lvl0"]];
            if (currentNode.children.length >=5) {
                continue
            } 
        } else {
            let newNode = {
                name: hit.hierarchy["lvl0"],
                children: [],
                lvl: "lvl0",
                url: hit.url,
                highlightResult: hit._highlightResult.hierarchy.lvl0.value,
            };
    
            graph[newNode.name] = newNode;
            currentNode = newNode;
        }
    
        let previousLvl = "lvl0";
    
        for (let index = 0; index < 1000; index++) {
            {
                const currentLvl: any = getNextLvl(previousLvl);
                if (!currentLvl || !hit.hierarchy[currentLvl]) break;
    
                const childrenNames = currentNode.children.map((child: any) => child.name);
    
                if (childrenNames.includes(hit.hierarchy[currentLvl])) {
                    currentNode = graph[hit.hierarchy[currentLvl]];
                } else {
                    let newNode = {
                        name: hit.hierarchy[currentLvl],
                        children: [],
                        lvl: currentLvl,
                        url: hit.url,
                        highlightResult: hit._highlightResult.hierarchy[currentLvl].value,
                    };
    
                    graph[newNode.name] = newNode;
                    currentNode.children.push(newNode);
                    currentNode = newNode;
                }
    
                previousLvl = currentLvl;
            }
        }
    }
    return graph
}

export const getFlattenedItems = (hits: any) => {
    // Creates a graph where lvl0 nodes has a children array which contains lvl1 nodes and so on
    const graph: any = createHierarchyGraph(hits);
    const lvl0Nodes: any = getLvl0Nodes(graph);
    let itemID = 0;
    let flattenedItems = []

    // Traverse through the graph and return flattened items
    for (const lvl0Node of lvl0Nodes) {
        let stack = [lvl0Node];
        while (stack.length > 0) {
            const currentNode = stack.pop();
            const isHighestLvl = currentNode.children.length === 0;

            switch (currentNode.lvl) {
                case "lvl0":
                    flattenedItems.push({
                        name: currentNode.name,
                        lvl: 0,
                    });
                    break;
                case "lvl1":
                    if (isHighestLvl) {
                        flattenedItems.push({
                            id: itemID,
                            lvl: 1,
                            url: currentNode.url,
                            name: currentNode.name,
                            highlightResult: currentNode.highlightResult,
                            isHighestLvl,
                        });
                    } else {
                        flattenedItems.push({
                            id: itemID,
                            lvl: 1,
                            url: currentNode.url,
                            name: currentNode.name,
                            highlightResult: currentNode.highlightResult,
                            isHighestLvl,
                        });
                    }
                    itemID += 1;
                    break;
                case "lvl2":
                    if (isHighestLvl) {
                        flattenedItems.push({
                            id: itemID,
                            lvl: 2,
                            url: currentNode.url,
                            name: currentNode.name,
                            highlightResult: currentNode.highlightResult,
                            isHighestLvl,
                        });
                        itemID += 1;
                    }
                    break;
                case "lvl3":
                    if (isHighestLvl) {
                        flattenedItems.push({
                            id: itemID,
                            lvl: 3,
                            url: currentNode.url,
                            name: currentNode.name,
                            highlightResult: currentNode.highlightResult,
                            isHighestLvl,
                        });
                        itemID += 1;
                    }
                    break;

                default:
                    break;
            }

            for (const child of currentNode.children.reverse()) {
                stack.push(child);
            }
        }
    }

    return flattenedItems
}
