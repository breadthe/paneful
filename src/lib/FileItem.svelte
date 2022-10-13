<script lang="ts">
  import type { FileEntry } from "../types"
  import FolderIcon from "./icons/FolderIcon.svelte"

  // system/lib/util imports
  //   import { invoke } from "@tauri-apps/api/tauri"
  //   import { onMount } from "svelte"

  // type imports

  // store imports
  //   import { system } from "../store"
  //   const { theme } = system
  import { browser } from "../store"
  const { activePane, homeDir, highlightedFile } = browser

  export let pane: string
  export let file: FileEntry | undefined = undefined
  export let isParent: boolean = false // designates the parent directory that always appears at the top of the list

  const parentDirGenericName: string = ".."

  $: isHighlighted =
    pane === $activePane &&
    ($highlightedFile === file?.name || (!$highlightedFile && isParent))

  function setHighlightedFile() {
    activePane.set(pane)
    highlightedFile.set(isParent ? null : file?.name)
  }
</script>

<tr
  class:bg-blue-600={isHighlighted}
  class:text-white={isHighlighted}
  on:click={() => setHighlightedFile()}
>
  <td class="flex items-center gap-2 border-r border-gray-300">
    {#if isParent || file.is_dir}
      <FolderIcon />
    {/if}

    <span>
      {#if isParent}
        {parentDirGenericName}
      {:else}
        {file.name}
      {/if}
    </span>
  </td>
  <td class="text-right flex-grow border-r border-gray-300">
    {#if typeof file !== "undefined"}
      <span title={file.size.toString()}>
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
      {#if typeof file !== "undefined"}
        {new Date(file.modified.secs_since_epoch * 1000).toLocaleString()}
      {/if}
    </div>
  </td></tr
>

<style>
  td {
    cursor: theme("cursor.default");
    font-size: theme("fontSize.sm");
    padding: 0 theme("spacing.1");
  }
</style>
