<script lang="ts">
  import type { FileEntry } from "../types"
  import Folder from "./icons/Folder.svelte"

  // system/lib/util imports
  //   import { invoke } from "@tauri-apps/api/tauri"
  //   import { onMount } from "svelte"

  // type imports

  // store imports
  //   import { system } from "../store"
  //   const { theme } = system
  //   import { browser } from "../store"
  //   const { activePane, homeDir } = browser

  export let parentDirGenericName: string = ".."
  export let file: FileEntry | undefined = undefined
  export let type: string = "file" // "file" or "folder"

  let fileList: [] = []
</script>

<tr class="">
  <td class="flex items-center gap-2 border-r border-gray-300">
    {#if type === "folder"}
      <Folder />
    {/if}

    <span>
      {#if typeof file === "undefined"}
        {parentDirGenericName}
      {:else}
        {file.name}
      {/if}
    </span>
  </td>
  <td class="text-right flex-grow border-r border-gray-300">
    {#if typeof file !== "undefined"}
      <span title={file.size.toString()}>
        {#if type === "file"}
          {file.size_pretty}
        {:else}
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
    font-size: theme("fontSize.sm");
    padding: 0 theme("spacing.1");
  }
</style>
