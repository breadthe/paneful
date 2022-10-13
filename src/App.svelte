<script lang="ts">
  // system/lib/util imports
  import { invoke } from "@tauri-apps/api/tauri"
  import { onMount } from "svelte"

  // store imports
  import { system } from "./store"
  const { activeSection } = system

  // section imports
  import Browser from "./Browser.svelte"
  import Settings from "./Settings.svelte"

  // component imports
  import Nav from "./lib/Nav.svelte"
  import Theme from "./lib/Theme.svelte"

  const sections = [
    { id: "Browser", component: Browser },
    { id: "Settings", component: Settings },
  ]

  onMount(() => {
    invoke("close_splashscreen")
  })
</script>

<main class="flex flex-col gap-2">
  <Nav />

  <!-- Dynamic section based on activeSection -->
  <svelte:component
    this={sections.find((section) => section.id === $activeSection).component}
  />

  <!-- Renderless, conditionally sets "dark" class on the html element -->
  <Theme />
</main>

<style>
</style>
