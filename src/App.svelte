<script lang="ts">
  // system/lib/util imports
  import { invoke } from "@tauri-apps/api/tauri"
  import { onMount } from "svelte"

  // store imports
  import { browser, system } from "./store"
  const {
    homeDir,
    activePane,
    leftCurrentDir,
    rightCurrentDir,
    highlightedFile,
  } = browser
  const { activeSection } = system

  // section imports
  import Browser from "./Browser.svelte"
  import Settings from "./Settings.svelte"

  // component imports
  import Nav from "./lib/Nav.svelte"
  import Theme from "./lib/Theme.svelte"
  import { Panes } from "./types"

  const sections = [
    { id: "Browser", component: Browser },
    { id: "Settings", component: Settings },
  ]

  async function setHomeDir() {
    // Invoke the Stable Diffusion command
    await invoke("get_home_dir")
      .then(async (res) => {
        homeDir.set(JSON.stringify(res))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //
      })
  }

  function setPaneDirs() {
    if ($highlightedFile[Panes.Left]?.parent_dir) {
      leftCurrentDir.set($highlightedFile[Panes.Left]?.parent_dir)
    }
    if ($highlightedFile[Panes.Right]?.parent_dir) {
      rightCurrentDir.set($highlightedFile[Panes.Right]?.parent_dir)
    }
  }

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault()
      $activePane === "left" ? activePane.set("right") : activePane.set("left")
    }
  }

  function handleGlobalKeys(_node: HTMLElement) {
    document.addEventListener("keydown", keydownHandler)

    return {
      destroy() {
        document.removeEventListener("keydown", keydownHandler)
      },
    }
  }

  onMount(() => {
    invoke("close_splashscreen")

    setHomeDir()

    // @todo this isn't working as I expected, most likely needs to be removed
    // setPaneDirs()
  })
</script>

<main class="flex flex-col" use:handleGlobalKeys>
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
