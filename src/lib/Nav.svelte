<script lang="ts">
  // system/lib/util imports
  import Modal from "svelte-simple-modal"

  // store imports
  //   import { system } from "../store"
  //   const { activeSection } = system

  // component imports
  import SettingsButton from "./SettingsButton.svelte"
</script>

<nav class="w-full py-2 bg-white dark:bg-gray-800">
  <div class="flex justify-between px-2">
    <!-- app logo -->
    <div class="flex items-center gap-2">
      <img src="/128x128.png" alt="Paneful logo" class="w-8 h-8" />
      <span class="font-bold font-mono">Paneful</span>
    </div>

    <Modal>
      <SettingsButton />
    </Modal>
  </div>
</nav>

<style>
</style>
