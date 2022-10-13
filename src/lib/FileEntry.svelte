<script lang="ts">
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

  export let file: string = ".."
  export let type: string = "file" // file or folder

  let fileList: [] = []
</script>

<div class="flex items-center gap-2">
  {#if type === "folder"}
    <Folder />
  {/if}

  <span>{file}</span>
</div>

<style>
  .active {
    border: 2px solid theme("colors.blue.500");
  }
</style>
