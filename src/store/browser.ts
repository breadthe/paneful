import { writable } from "svelte/store"

// Set the home directory
const defaultHomeDir: string = "/"
const storedHomeDir: string = localStorage.getItem("homeDir") || defaultHomeDir
export const homeDir = writable(storedHomeDir ? storedHomeDir : defaultHomeDir)
homeDir.subscribe((value: string) => {
    localStorage.setItem("homeDir", value);
})

// The currently active pane, defaults to the "left" pane
const defaultActivePane:string = "left"
const storedActivePane:string = localStorage.getItem("activePane") || defaultActivePane
export const activePane = writable(storedActivePane ? storedActivePane : defaultActivePane)
activePane.subscribe((value: string) => {
    localStorage.setItem("activePane", value);
})

// The currently highlighted file
const defaultHighlightedFile: string | null = null // null means the parent directory ".." is highlighted by default
const storedHighlightedFile: string | null = JSON.parse(localStorage.getItem("highlightedFile")) || defaultHighlightedFile
export const highlightedFile = writable(storedHighlightedFile ? storedHighlightedFile : defaultHighlightedFile)
highlightedFile.subscribe((value: string) => {
    localStorage.setItem("highlightedFile", value);
})
