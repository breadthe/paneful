<script lang="ts">
  // system/lib/util imports
  import { invoke } from "@tauri-apps/api/tauri"
  import type { FileEntry } from "../types"
  import { onMount } from "svelte"

  // type imports

  // store imports
  //   import { system } from "../store"
  //   const { theme } = system
  import { browser } from "../store"
  const { activePane, homeDir } = browser

  // component imports
  import FileItem from "./FileItem.svelte"

  export let pane: string = "left"

  $: currentDir = JSON.parse($homeDir)

  let dirListing: Array<FileEntry> = []

  async function getFiles() {
    // Invoke the Stable Diffusion command
    await invoke("get_files_in_dir", { dirPath: currentDir })
      .then((res: string) => {
        dirListing = JSON.parse(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //
      })
  }

  function populateFiles(node: any) {
    getFiles()
  }

  onMount(() => {
    getFiles()
  })
</script>

<aside
  class="h-full w-full"
  class:active={$activePane === pane}
  class:ml-1={$activePane === "right"}
  class:mr-1={$activePane === "left"}
>
  <div class="p-1 bg-gray-600 text-white text-sm">
    {currentDir}
  </div>

  <div class="h-full w-full overflow-y-auto p-1">
    <FileItem type="folder" />

    {#each dirListing as file}
      <FileItem {file} />
    {/each}
  </div>
</aside>

<style>
  .active {
    border: 2px solid theme("colors.blue.500");
  }
</style>
