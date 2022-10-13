import { writable } from "svelte/store"

// The currently active pane, defaults to the "left" pane
const defaultActivePane:string = "left"
const storedActivePane:string = localStorage.getItem("activePane") || defaultActivePane
export const activePane = writable(storedActivePane ? storedActivePane : defaultActivePane)
activePane.subscribe((value: string) => {
    localStorage.setItem("activePane", value);
})

// The currently active pane, defaults to the "left" pane
const defaultHomeDir: string = "/"
const storedHomeDir: string = localStorage.getItem("homeDir") || defaultHomeDir
export const homeDir = writable(storedHomeDir ? storedHomeDir : defaultHomeDir)
homeDir.subscribe((value: string) => {
    localStorage.setItem("homeDir", value);
})
