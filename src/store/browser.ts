import { writable } from "svelte/store"

// The currently active section of the app, defaults to the "Txt2Img" section
const defaultActivePane = "left"
const storedActivePane = localStorage.getItem("activePane") || defaultActivePane
export const activePane = writable(storedActivePane ? storedActivePane : defaultActivePane)
activePane.subscribe((value: string) => {
    localStorage.setItem("activePane", value);
})
