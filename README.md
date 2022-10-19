<p align="center">
    <img src="https://user-images.githubusercontent.com/17433578/196566322-35f86328-8a6e-4faa-b853-df41bf1f366e.png" width="150" height="150" alt="Paneful logo" />
</p>

<h1 align="center"><b>Paneful</b></h1>

Cross platform desktop dual-pane file browser. It is an open source alternative to popular dual-pane browsers such as [Total Commander](https://www.ghisler.com/) for Windows or [Commander One](https://apps.apple.com/us/app/commander-one-file-manager/id1035236694?mt=12) for Mac.

![paneful-screenshot](https://user-images.githubusercontent.com/17433578/196564460-6cf74caa-120e-458f-bb26-8230eaa03cba.jpg)

## Stack

Made with:

- Back-end: [Tauri](https://tauri.app/) + [Rust](https://www.rust-lang.org/)
- Front-end: [Svelte](https://svelte.dev/)
- UI: [Tailwind CSS](https://tailwindcss.com/)
- Icons: [Teenyicons](https://teenyicons.com/)
- Various packages (check `package.json`)

[](#feature-list)

## Features

**MVP**

- [x] Dual-pane, resizeable layout.
- [x] Show file name, extension, size, modified date, kind (file, folder, etc).
- [x] Start by default in the Home directory.
- [x] Remember the directory location in each pane when quitting the app.
- [x] Switch between panes with TAB.
- [x] Show directories first.
- [x] Top entry navigates to parent folder.
- [x] Highlight a file/folder by navigating with up/down keys or clicking it.
- [x] Open a file in its associated app with double click or ENTER.
- [x] Select a file/folder with SPACE.
- [] Quick filter by file name.

[](#beyond-mvp)

**Beyond MVP**

- [x] Current folder path is breadcrumbed and navigable.
- [x] Dark/light mode with persistence.
- [] Navigate to top/bottom of list with Fn+arrow.
- [] Arrow navigation should scroll the pane.
- [] Simple controls for:
    - [x] F3 - view file (opens in associated app), also works with double click or ENTER.
    - [] F4 - edit file (opens in text editor).
    - [] F5 - copy a file/folder or selection to the other pane.
    - [] F6 - move a file/folder or selection to the other pane.
    - [] F7 - create new folder in the active pane.
    - [] F8 - delete a file/folder or selection.
- [x] Sort files by clicking the column header:
    - [x] Name
    - [x] Size
    - [x] Modified date
- [] When a directory opened in a pane is deleted while the app is closed, reset the location to the parent directory if it exists (keep going up the hierarchy), else the Home directory.
- [] When a directory opened in a pane is deleted while the app is closed, reset the location to the parent directory if it exists (keep going up the hierarchy), else the Home directory.

**Nice to have**

- [] Disk drive selection for computers with multiple drives.
- [] Progress indicators for various operations (copy, move, etc).
- [] File type icons.
- [] Pane tabs.
    - [] New tab with CMD/CTRL+T.
    - [] Close tab with CMD/CTRL+W.
- [] Forward/back navigation thru directory history.
- [] Right click a file/folder for a context menu:
    - [] Info, etc.
- [] Remember sorting, filtering, etc for each pane when quitting.
- [] Remember pane split.
- [] Remember app window size & position.
- [x] Summary of file counts & sizes below each pane.
- [x] Selecting files shows a summary below each pane.
- [] Add granular data for the above 2: total sizes and distinguish between files & folders.
- [] Follow a symlink.
- [] When navigating up a folder (back), set the highlighted file to the directory that was navigated from instead of defaulting to "..". Likely requires navigation history.
- [] Bookmarks - mark files & folders as favorite and find them in a list.
- [] Apply dark theme to scrollbars as well.

[](#issues)

**Issues**

- [] 🐛 Production builds are failing across all platforms.
- [] 🐛 Navigating higher than "/" should be disallowed.
- [] 🐛 Focusing the app from a cold start allows tabbing only after clicking inside the pane once.
- [] 🐛 Navigating to a folder should clear any file selections in that pane.
- [] 🐛 Sorting a column header in a tab should make that tab active.
- [] 🐛 F-keys in the command bar are not clickable.
- [] Windows:
    - [] 🐛 It starts in an empty nameless folder with only the parent ".." folder. Navigating to it goes to "C:\Users\<my-user>". From there I can't navigate to the parent folder due to permissions, but I can navigate to folders within.
    - [] 🐛 The breadcrumbs are wrong; the URL splitting is done naively for Mac only.
    - [] 🐛 The file open action doesn't work.

## Download

Download the binary for your platform under [Releases](https://github.com/breadthe/Paneful/releases).

**Note** Binaries don't work as of v0.3.0.

## Building the app

In addition to the above, if you want to build the binaries yourself, first install the [Tauri environment + CLI](https://tauri.app/v1/guides/getting-started/prerequisites) (including the Rust CLI + Cargo), then clone this repo and run:

```shell
npm install

# dev mode
cargo tauri dev

# build the production app
cargo tauri build
```

## Contributing

This project is purely experimental and I can't guarantee it will hold my interest long term, but if you wish to contribute please focus on these areas:

* [Issues](#issues) are the highest priority.
* [Beyond MVP](beyond-mvp) features are next.

I am not interested in ideas beyond what's listed under [Features]([](#feature-list)).

## License

[MIT](https://github.com/breadthe/Paneful/blob/main/LICENSE)
