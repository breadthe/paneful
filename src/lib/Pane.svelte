<script lang="ts">
  // system/lib/util imports
  import { invoke } from "@tauri-apps/api/tauri"
  import type { FileEntry } from "../types"
  import { Panes } from "../types"
  import { onMount } from "svelte"

  // type imports

  // store imports
  //   import { system } from "../store"
  //   const { theme } = system
  import { browser } from "../store"
  const { activePane, homeDir, highlightedFile } = browser

  // component imports
  import FileItem from "./FileItem.svelte"

  export let pane: Panes = Panes.Left

  // check which pane is active from the $highlightedFile store and get the files from the path
  let currentDir: string
  $: {
    if ($highlightedFile && $highlightedFile[pane]?.path) {
      currentDir = $highlightedFile[pane]?.path

      // remove the file name from the path if it's anything but the parent directory ".."
      if ($highlightedFile[pane]?.name !== "..") {
        currentDir = $highlightedFile[pane]?.path
          .split("/")
          .slice(0, -1)
          .join("/") // /Users/<my-user>/.rustup -> /Users/<my-user>
      }
    } else {
      currentDir = JSON.parse($homeDir) // /Users/<my-user>
    }
  }

  let dirListing: Array<FileEntry> = []

  const parentFolder: FileEntry = {
    name: "..",
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
      return a.name.localeCompare(b.name)
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

  onMount(() => {
    getFiles()
  })
</script>

<aside class="h-full w-full" class:active={$activePane === pane}>
  <div class="p-1 bg-gray-600 text-white text-sm">
    {currentDir}
  </div>

  <div class="h-full w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-300 text-sm">
          <th class="text-left border-r border-gray-300">name</th>
          <th class="text-right border-r border-gray-300">size</th>
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
        <tr><td colspan="3">&nbsp;</td></tr>
      </tbody>
    </table>
  </div>
</aside>

<style>
  aside {
    border: theme("borderWidth.2") solid theme("colors.gray.300");
  }
  aside.active {
    border: theme("borderWidth.2") solid theme("colors.blue.600");
  }

  th {
    background-color: theme("colors.gray.300");
    position: sticky;
    top: theme("spacing.0");
    padding: 0 theme("spacing.1");
  }
</style>
