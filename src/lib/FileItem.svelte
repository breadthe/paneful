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
  export let type: string = "file" // file or folder

  let fileList: [] = []
</script>

<div class="flex items-center gap-2">
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
</div>

<style>
  .active {
    border: 2px solid theme("colors.blue.500");
  }
</style>
