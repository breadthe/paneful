<script lang="ts">
  // system/lib/util imports
  import { convertFileSrc } from "@tauri-apps/api/tauri"
  import { open } from "@tauri-apps/api/shell"
  //   import { invoke } from "@tauri-apps/api/tauri"
  //   import { onMount } from "svelte"

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
    selectedFiles,
  } = browser

  // component imports
  import FolderIcon from "./icons/FolderIcon.svelte"

  export let pane: Panes
  export let file: FileEntry | undefined = undefined
  export let isParent: boolean = false // designates the parent directory that always appears at the top of the list

  const parentDirGenericName: string = ".."

  $: isHighlighted =
    pane === $activePane &&
    ($highlightedFile?.[pane]?.name === file?.name ||
      (isParent &&
        (!$highlightedFile ||
          ($highlightedFile?.[pane]?.name === parentDirGenericName &&
            isParent))))

  $: isSelected = $selectedFiles?.[pane]?.some(
    (selectedFile: HighlightedFile) => {
      return selectedFile.name === file?.name
    }
  )

  $: thisCurrentDir = eval(`${$activePane}CurrentDir`) // leftCurrentDir or rightCurrentDir

  function setHighlightedFile() {
    activePane.set(pane)

    const hlFile: HighlightedFile = {
      pane,
      name: file?.name || parentDirGenericName,
      path: file?.path || file?.parent_dir || "",
      parent_dir: file?.parent_dir || JSON.parse($homeDir),
    }

    highlightedFile.set(hlFile)
  }

  async function openFile(filePath: string) {
    if (!filePath) return

    // @see https://tauri.app/v1/api/js/modules/tauri/#convertfilesrc
    const fileSrc = convertFileSrc(filePath)

    await open(`file://${fileSrc}`)
  }

  // handle double-clicking or ENTER on a file
  function handleAction() {
    if (file.is_dir) {
      navigateToDir()
    }

    if (file.is_file) {
      openFile(file.path)
    }
  }

  // get the highlighted file in the current pane and if is a directory, set the current dir for the current pane to that directory
  function navigateToDir() {
    // get the highlighted file in the current pane and if is a directory, set the current dir for the current pane to that directory
    if (isParent) {
      thisCurrentDir.set(file?.parent_dir)
    } else if (file.is_dir) {
      thisCurrentDir.set(file?.path)
    }

    // set the highlighted file in the new directory to the parent directory ".."
    // @todo if navigating up (back) to a directory, set the highlighted file to the directory that was navigated from
    const hlFile: HighlightedFile = {
      pane,
      name: parentDirGenericName,
      path: isParent ? file?.parent_dir : file?.path,
      parent_dir: isParent
        ? file?.parent_dir.split("/").slice(0, -1).join("/") || // /Users/<my-user> -> /Users
          JSON.parse($homeDir)
        : file?.parent_dir,
    }
    highlightedFile.set(hlFile)
  }

  const keydownHandler = (event: KeyboardEvent) => {
    if (!isHighlighted) return

    switch (event.code) {
      case "Enter":
      case "F3":
        event.preventDefault()
        handleAction()
        break

      case "Space":
        event.preventDefault()
        // add the file to the selected files store or remove it if it's already there
        selectedFiles.toggle(pane, $highlightedFile[pane])
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
</script>

<tr
  class:bg-blue-600={isHighlighted}
  class:text-white={isHighlighted}
  on:click={() => setHighlightedFile()}
  on:dblclick={() => handleAction()}
  use:handleGlobalKeys
>
  <td class="flex items-center gap-2 border-r border-gray-300 dark:border-gray-700" class:bg-blue-100={isSelected && !isHighlighted} class:bg-blue-200={isSelected && isHighlighted}>
    {#if isParent || file.is_dir}
      <FolderIcon />
    {/if}

    <span class:font-bold={isSelected} class:text-blue-600={isSelected}>
      {#if isParent}
        {parentDirGenericName}
      {:else}
        {file.name}
      {/if}
    </span>
  </td>
  <td class="text-right flex-grow border-r border-gray-300 dark:border-gray-700">
    {#if typeof file !== "undefined"}
      <span title={file?.size?.toString() || ""}>
        {#if file.is_file}
          {file.size_pretty}
        {:else if file.is_dir}
          DIR
        {/if}
      </span>
    {/if}
  </td>
  <td class="">
    <div class="w-full overflow-hidden">
      {#if typeof file !== "undefined" && file?.modified}
        {new Date(file.modified * 1000).toLocaleString()}
      {/if}
    </div>
  </td>
</tr>

<style>
  td {
    cursor: theme("cursor.default");
    font-size: theme("fontSize.sm");
    padding: 0 theme("spacing.1");

    /* Disable selection of the underlying content when double-clicking a folder */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
