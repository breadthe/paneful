<script lang="ts">
  // system/lib/util imports

  // type imports

  // store imports
//   import { system } from "../store"
//   const { theme } = system
  import { browser } from "../store"
  const { activePane } = browser

export let pane: string = "left"
</script>

<aside
    class="h-full w-full"
    class:active={$activePane === pane}
    class:ml-1={$activePane === "right"}
    class:mr-1={$activePane === "left"}
>
    {#if pane === "left"}
        Left pane
    {:else}
        Right pane
    {/if}
</aside>

<style>
    .active {
        border: 1px solid blue;
    }
</style>
