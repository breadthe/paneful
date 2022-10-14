<script lang="ts">
  // type imports
  import { Panes } from "../types"

  // store imports
  import { browser } from "../store"
  const { selectedFiles } = browser

  export let totalFiles: number = 0
  export let pane: Panes

  $: selectedFilesCount = $selectedFiles[pane]?.length ?? 0
</script>

<footer class="bg-gray-300 text-sm p-1 text-center">
  {totalFiles} / {selectedFilesCount} file(s)
</footer>

<style>
</style>
