<script lang="ts">
  import CommandBar from "./lib/CommandBar.svelte"

  // system/lib/util imports
  import { Pane as SplitPane, Splitpanes } from "svelte-splitpanes"

  // store imports
  //   import { system } from "./store"
  //   const { activeSection } = system

  // component imports
  import Pane from "./lib/Pane.svelte"
</script>

<Splitpanes class="default-theme" style="">
  <SplitPane minSize={40}><Pane pane="left" /></SplitPane>
  <SplitPane minSize={40}><Pane pane="right" /></SplitPane>
</Splitpanes>

<CommandBar />

<style>
  :global(.splitpanes) {
    height: calc(100vh - 100px);
  }
  :global(.splitpanes__pane) {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    height: 100%;
  }
</style>
