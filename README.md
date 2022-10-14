# ![Square30x30Logo](https://user-images.githubusercontent.com/17433578/195490908-9e22909f-0b57-4c11-bc4a-766d69f43fd9.png) Paneful

Cross platform desktop dual-pane file browser. It is an open source alternative to popular dual-pane browsers such as [Total Commander](https://www.ghisler.com/) for Windows or [Commander One](https://apps.apple.com/us/app/commander-one-file-manager/id1035236694?mt=12) for Mac.

## Stack

The app is made with:

- Back-end: [Tauri](https://tauri.app/) + [Rust]()https://www.rust-lang.org/
- Front-end: [Svelte](https://svelte.dev/)
- UI: [Tailwind CSS](https://tailwindcss.com/)
- Various packages (check `package.json`)

[](#feature-list)

## Features

**MVP**

- <label><input type="checkbox" checked /> Dual-pane, resizeable layout.</label>
- <label><input type="checkbox" checked /> Show file name, extension, size, modified date, kind (file, folder, etc).</label>
- <label><input type="checkbox" checked /> Start by default in the Home directory.</label>
- <label><input type="checkbox" checked /> Remember the directory location in each pane when quitting the app.</label>
- <label><input type="checkbox" checked /> Switch between panes with TAB.</label>
- <label><input type="checkbox" checked /> Show directories first.</label>
- <label><input type="checkbox" checked /> Top entry navigates to parent folder.</label>
- <label><input type="checkbox" checked /> Highlight a file/folder by navigating with up/down keys or clicking it.</label>
- <label><input type="checkbox" checked /> Open a file in its associated app with double click or ENTER.</label>
- <label><input type="checkbox" /> Quick filter by file name.</label>
- <label><input type="checkbox" checked /> Select a file/folder with SPACE.</label>

**Beyond MVP**

- <label><input type="checkbox" /> Dark/light mode with persistence.</label>
- <label><input type="checkbox" /> Navigate to top/bottom of list with Fn+arrow.</label>
- <label><input type="checkbox" /> Arrow navigation should scroll the pane.</label>
- <label><input type="checkbox" /> Simple controls for:</label>
    - <label><input type="checkbox" checked /> F3 - view file (opens in associated app), also works with double click or ENTER.</label>
    - <label><input type="checkbox" /> F4 - edit file (opens in text editor).</label>
    - <label><input type="checkbox" /> F5 - copy a file/folder or selection to the other pane.</label>
    - <label><input type="checkbox" /> F6 - move a file/folder or selection to the other pane.</label>
    - <label><input type="checkbox" /> F7 - create new folder in the active pane.</label>
    - <label><input type="checkbox" /> F8 - delete a file/folder or selection.</label>
- <label><input type="checkbox" /> Sort files by clicking the column header.</label>
- <label><input type="checkbox" /> When a directory opened in a pane is deleted while the app is closed, reset the location to the parent directory if it exists (keep going up the hierarchy), else the Home directory.</label>
- <label><input type="checkbox" checked /> Current folder path is breadcrumbed and navigable.</label>

**Nice to have**

- <label><input type="checkbox" /> Disk drive selection for computers with multiple drives.</label>
- <label><input type="checkbox" /> Progress indicators for various operations (copy, move, etc).</label>
- <label><input type="checkbox" /> File type icons.</label>
- <label><input type="checkbox" /> Pane tabs.</label>
    - <label><input type="checkbox" /> New tab with CMD/CTRL+T.</label>
    - <label><input type="checkbox" /> Close tab with CMD/CTRL+W.</label>
- <label><input type="checkbox" /> Forward/back navigation thru directory history.</label>
- <label><input type="checkbox" /> Right click a file/folder for a context menu:</label>
    - <label><input type="checkbox" /> Info, etc.</label>
- <label><input type="checkbox" /> Remember sorting, filtering, etc for each pane when quitting.</label>
- <label><input type="checkbox" /> Remember pane split.</label>
- <label><input type="checkbox" /> Remember app window size & position.</label>
- <label><input type="checkbox" checked /> Summary of file counts & sizes below each pane.</label>
- <label><input type="checkbox" checked /> Selecting files shows a summary below each pane.</label>
- <label><input type="checkbox" /> Add granular data for the above 2: total sizes and distinguish between files & folders.</label>
- <label><input type="checkbox" /> Follow a symlink.</label>
- <label><input type="checkbox" /> When navigating up a folder (back), set the highlighted file to the directory that was navigated from instead of defaulting to "..". Likely requires navigation history.</label>

## Download

WIP

## Building the app

In addition to the above, if you want to build the binaries yourself, first install the [Tauri environment + CLI](https://tauri.app/v1/guides/getting-started/prerequisites) (including the Rust CLI + Cargo), then clone this repo and run:

```shell
npm install

# dev mode
cargo tauri dev

# build the production app
cargo tauri build
```

## License

[MIT](MIT)
