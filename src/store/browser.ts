import type { HighlightedFile, PaneHighlightedFile } from "../types"
import { writable } from "svelte/store"

// Set the home directory
const defaultHomeDir: string = "/"
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
    let storedHighlightedFile: PaneHighlightedFile = JSON.parse(localStorage.getItem("highlightedFile")) || defaultHighlightedFile
    const { subscribe, set } = writable(storedHighlightedFile ? storedHighlightedFile : defaultHighlightedFile)

    return {
        subscribe,
        set: (hlFile: HighlightedFile) => {
            let newHighlightedFile = storedHighlightedFile

            if (newHighlightedFile && newHighlightedFile[hlFile.pane]) {
                newHighlightedFile[hlFile.pane] = { name: hlFile.name, path: hlFile.path }
            } else {
                newHighlightedFile[hlFile.pane === "left" ? "left" : "right"] = { name: hlFile.name, path: hlFile.path }
            }

            storedHighlightedFile = newHighlightedFile
            localStorage.setItem("highlightedFile", JSON.stringify(storedHighlightedFile))
            set(storedHighlightedFile)
        }
    };
}
export const highlightedFile = createHighlightedFileStore()
