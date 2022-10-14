<script lang="ts">
  // type imports
  import type { HighlightedFile } from "../types"
  import { Panes } from "../types"

  // store imports
  import { browser } from "../store"
  const { activePane, highlightedFile, leftCurrentDir, rightCurrentDir } =
    browser

  // component imports
  import HomeAltIcon from "./icons/HomeAltIcon.svelte"
  import RightSmallIcon from "./icons/RightSmallIcon.svelte"

  export let pane: Panes
  export let currentDir: string

  const parentDirGenericName: string = ".."

  $: thisCurrentDir = eval(`${$activePane}CurrentDir`) // leftCurrentDir or rightCurrentDir

  $: breadcrumbs = currentDir.split("/").filter((item) => item !== "")

  function navigateToDir(breadcrumbFragment: string) {
    const pathArray = breadcrumbs

    // keep popping off the end of the array until we get to the breadcrumb fragment
    while (pathArray[pathArray.length - 1] !== breadcrumbFragment) {
      pathArray.pop()
    }

    const path = "/" + pathArray.join("/")

    // set the active pane
    activePane.set(pane)

    // set the directory
    thisCurrentDir.set(path)

    // set the highlighted file in the new directory to the parent directory ".."
    const hlFile: HighlightedFile = {
      pane: $activePane as Panes,
      name: parentDirGenericName,
      path: path,
      parent_dir: path.split("/").slice(0, -1).join("/"),
    }

    highlightedFile.set(hlFile)
  }
</script>

<nav class="flex items-center gap-1 px-1 bg-gray-600 text-white text-sm">
  <span class="p-1">
    <HomeAltIcon />
  </span>

  {#each breadcrumbs as breadcrumb}
    <RightSmallIcon />
    <button
      class="p-1 hover:bg-gray-500"
      on:click={() => navigateToDir(breadcrumb)}>{breadcrumb}</button
    >
  {/each}
</nav>

<style>
</style>
