import type { HighlightedFile, PaneHighlightedFile } from "../types"
import { Panes } from "../types"
import { writable } from "svelte/store"

const defaultHomeDir: string = "/"

// Set the current directory for the left and right panes
const storedLeftCurrentDir: string = JSON.parse(localStorage.getItem("leftCurrentDir")) || defaultHomeDir
export const leftCurrentDir = writable(storedLeftCurrentDir ? storedLeftCurrentDir : defaultHomeDir)
leftCurrentDir.subscribe((value: string) => {
    localStorage.setItem("leftCurrentDir", JSON.stringify(value))
})
const storedRightCurrentDir: string = JSON.parse(localStorage.getItem("rightCurrentDir")) || defaultHomeDir
export const rightCurrentDir = writable(storedRightCurrentDir ? storedRightCurrentDir : defaultHomeDir)
rightCurrentDir.subscribe((value: string) => {
    localStorage.setItem("rightCurrentDir", JSON.stringify(value))
})

// Set the home directory
const storedHomeDir: string = localStorage.getItem("homeDir") || defaultHomeDir
export const homeDir = writable(storedHomeDir ? storedHomeDir : defaultHomeDir)
homeDir.subscribe((value: string) => {
    localStorage.setItem("homeDir", value)
})

// The currently active pane, defaults to the "left" pane
const defaultActivePane:string = "left"
const storedActivePane:string = localStorage.getItem("activePane") || defaultActivePane
export const activePane = writable(storedActivePane ? storedActivePane : defaultActivePane)
activePane.subscribe((value: string) => {
    localStorage.setItem("activePane", value)
})

// The currently highlighted file
function createHighlightedFileStore() {
    const defaultHighlightedFile: HighlightedFile | null = null // null means the parent directory ".." is highlighted by default
    const emptyPaneHighlightedFile: PaneHighlightedFile = {
        left: {
            name: null,
            path: null,
            parent_dir: null,
        },
        right: {
            name: null,
            path: null,
            parent_dir: null,
        },
    }
    let storedHighlightedFile: PaneHighlightedFile = JSON.parse(localStorage.getItem("highlightedFile")) || emptyPaneHighlightedFile
    const { subscribe, set } = writable(storedHighlightedFile ? storedHighlightedFile : defaultHighlightedFile)

    return {
        subscribe,
        set: (hlFile: HighlightedFile) => {
            let newHighlightedFile: PaneHighlightedFile = storedHighlightedFile || emptyPaneHighlightedFile

            if (newHighlightedFile && newHighlightedFile[hlFile.pane]) {
                newHighlightedFile[hlFile.pane] = { name: hlFile.name, path: hlFile.path, parent_dir: hlFile.parent_dir }
            } else {
                newHighlightedFile[hlFile.pane === Panes.Left ? Panes.Left : Panes.Right] = { name: hlFile.name, path: hlFile.path, parent_dir: hlFile.parent_dir }
            }

            storedHighlightedFile = newHighlightedFile
            localStorage.setItem("highlightedFile", JSON.stringify(storedHighlightedFile))
            set(storedHighlightedFile)
        }
    };
}
export const highlightedFile = createHighlightedFileStore()
