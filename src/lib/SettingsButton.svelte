<script lang="ts">
  // system/lib/util imports
  import { getContext } from "svelte"

  // component imports
  import CogIcon from "./icons/CogIcon.svelte"
  import Popup from "./Popup.svelte"

  const { open } = getContext("simple-modal")

  function openSettings() {
    console.log("open settings")
    open(Popup)
  }
</script>

<button on:click={openSettings} title="Settings"><CogIcon /></button>

<style>
</style>
