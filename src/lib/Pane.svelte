<script lang="ts">
  // system/lib/util imports
  import { invoke } from "@tauri-apps/api/tauri"
  import { onMount } from "svelte"

  // type imports
  import type { FileEntry, HighlightedFile } from "../types"
  import { Panes } from "../types"

  // store imports
  //   import { system } from "../store"
  //   const { theme } = system
  import { browser } from "../store"
  const {
    activePane,
    homeDir,
    highlightedFile,
    leftCurrentDir,
    rightCurrentDir,
    leftSort,
    rightSort,
  } = browser

  // component imports
  import FileItem from "./FileItem.svelte"
  import CurrentDir from "./CurrentDir.svelte"
  import SelectedFiles from "./SelectedFiles.svelte"
  import DownSmallIcon from "./icons/DownSmallIcon.svelte"
  import UpSmallIcon from "./icons/UpSmallIcon.svelte"

  export let pane: Panes = Panes.Left

  // check which pane is active from the $highlightedFile store and get the files from the path
  let currentDir: string
  $: {
    if (pane === Panes.Left && $leftCurrentDir) {
      currentDir = $leftCurrentDir
    } else if (pane === Panes.Right && $rightCurrentDir) {
      currentDir = $rightCurrentDir
    } else {
      currentDir = JSON.parse($homeDir) // /Users/<my-user>
    }

    getFiles()
  }

  $: thisPaneSort = eval(`${pane}Sort`)

  let dirListing: Array<FileEntry> = []

  const parentDirGenericName: string = ".."

  const parentFolder: FileEntry = {
    name: parentDirGenericName,
    path: "",
    parent_dir: "",
    is_dir: true,
    is_file: false,
    is_symlink: false,
  }

  // sort directory listing first by type (folders first) and then by name
  $: sortedDirListing = dirListing.sort((a, b) => {
    if (a.is_dir && !b.is_dir) {
      return -1
    } else if (!a.is_dir && b.is_dir) {
      return 1
    } else {
      if ($thisPaneSort === "nameAsc") return a.name.localeCompare(b.name)
      if ($thisPaneSort === "nameDesc") return b.name.localeCompare(a.name)
    }
  })

  async function getFiles() {
    // Invoke the Stable Diffusion command
    await invoke("get_files_in_dir", { dirPath: currentDir })
      .then((res: string) => {
        dirListing = JSON.parse(res)

        parentFolder.path = dirListing[0].parent_dir // @todo this is a hack, need to find a better way to get the parent dir
        parentFolder.parent_dir = dirListing[0].parent_dir
          .split("/")
          .slice(0, -1)
          .join("/") // /Users/<my-user> -> /Users
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //
      })
  }

  function sortFilesBy(field: string) {
    switch (field) {
      case "name":
        if ($thisPaneSort === "nameAsc") {
          thisPaneSort.set("nameDesc")
          break
        }

        if ($thisPaneSort === "nameDesc") {
          thisPaneSort.set("nameAsc")
          break
        }
        break

      default:
        break
    }
  }

  const keydownHandler = (event: KeyboardEvent) => {
    if ($activePane !== pane) return

    const currentHighlightedFile = $highlightedFile[pane]
    const ix = sortedDirListing.findIndex(
      (f) => f.name === currentHighlightedFile.name
    )
    const nextFile = sortedDirListing[ix + 1]
    const prevFile = sortedDirListing[ix - 1]

    switch (event.code) {
      case "ArrowUp":
        event.preventDefault()
        if (prevFile) {
          const hlFile: HighlightedFile = {
            pane,
            name: prevFile?.name || parentDirGenericName,
            path: prevFile?.path || prevFile?.parent_dir || "",
            parent_dir: prevFile?.parent_dir || JSON.parse($homeDir),
          }

          highlightedFile.set(hlFile)
        } else {
          // the parent ".." folder is highlighted
          const hlFile: HighlightedFile = {
            pane,
            name: parentDirGenericName,
            path: parentFolder.path,
            parent_dir: parentFolder.parent_dir,
          }

          highlightedFile.set(hlFile)
        }
        break

      case "ArrowDown":
        event.preventDefault()
        if (nextFile) {
          const hlFile: HighlightedFile = {
            pane,
            name: nextFile?.name || parentDirGenericName,
            path: nextFile?.path || nextFile?.parent_dir || "",
            parent_dir: nextFile?.parent_dir || JSON.parse($homeDir),
          }

          highlightedFile.set(hlFile)
        }
        break

      default:
        break
    }
  }

  function handleGlobalKeys(_node: HTMLElement) {
    document.addEventListener("keydown", keydownHandler)

    return {
      destroy() {
        document.removeEventListener("keydown", keydownHandler)
      },
    }
  }

  onMount(() => {
    getFiles()
  })
</script>

<aside
  class="h-full w-full"
  class:active={$activePane === pane}
  use:handleGlobalKeys
>
  <CurrentDir {pane} {currentDir} />

  <div
    class="h-full w-full overflow-y-auto"
    style="height: calc(100vh - 160px);"
  >
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-300 dark:border-gray-700 text-sm">
          <th
            class="flex items-center justify-between text-left border-r border-gray-300 dark:border-gray-700 cursor-pointer"
            on:click={() => sortFilesBy("name")}
          >
            <span>name</span>

            {#if $thisPaneSort === "nameAsc"}
              <!-- <button on:click={() => sortFilesBy("name")} class="cursor-pointer"><DownSmallIcon /></button> -->
              <DownSmallIcon />
            {/if}

            {#if $thisPaneSort === "nameDesc"}
              <!-- <button on:click={() => sortFilesBy("name")} class="cursor-pointer"><UpSmallIcon /></button> -->
              <UpSmallIcon />
            {/if}
          </th>
          <th class="text-right border-r border-gray-300 dark:border-gray-700">
            size
          </th>
          <th class="text-left">modified</th>
        </tr>
      </thead>

      <tbody>
        <!-- parent folder ".." -->
        <FileItem {pane} file={parentFolder} isParent />

        {#each sortedDirListing as file}
          <FileItem {pane} {file} />
        {/each}

        <!-- hack to prevent the last file from being hidden -->
        <!-- <tr><td colspan="3">&nbsp;</td></tr> -->
      </tbody>
    </table>
  </div>

  <SelectedFiles totalFiles={dirListing.length} {pane} />
</aside>

<style>
  aside {
    border: theme("borderWidth.2") solid;
    border-color: theme("colors.gray.300");
  }

  :global(html.dark aside) {
    border-color: theme("colors.gray.700");
  }

  aside.active {
    border: theme("borderWidth.2") solid theme("colors.blue.600");
  }

  :global(th) {
    background-color: theme("colors.gray.300");
    position: sticky;
    top: theme("spacing.0");
    padding: 0 theme("spacing.1");
  }

  :global(html.dark th) {
    background-color: theme("colors.gray.700") !important;
  }
</style>
