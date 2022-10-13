<script lang="ts">
  // system/lib/util imports
  import { getContext } from "svelte"

  // component imports
  import CogIcon from "./icons/CogIcon.svelte"
  import Popup from "./Popup.svelte"

  const { open } = getContext("simple-modal")
</script>

<button on:click={() => open(Popup)} title="Settings"><CogIcon /></button>

<style>
</style>
