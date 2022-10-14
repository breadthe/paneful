<script lang="ts">
  // system/lib/util imports

  // store imports
  //   import { system } from "./store"
  //   const { activeSection } = system

  // component imports
</script>

<div class="grid grid-cols-6 justify-between">
    <button class="command">View - F3</button>
    <button class="command">Edit - F4</button>
    <button class="command">Copy - F5</button>
    <button class="command">Move - F6</button>
    <button class="command">New Folder - F7</button>
    <button class="command">Delete - F8</button>
</div>

<style>
    :global(button.command) {
        cursor: theme("cursor.auto");
        font-size: theme("fontSize.sm");
        background-color: theme("colors.gray.100");
        border: 1px solid theme("colors.gray.300");
        padding: theme("padding.1") theme("padding.2");
    }

    :global(html.dark button.command) {
        background-color: theme("colors.gray.800");
        border: 1px solid theme("colors.gray.700");
    }

    :global(button.command:hover) {
        background-color: theme("colors.gray.200");
    }

    :global(html.dark button.command:hover) {
        background-color: theme("colors.gray.600");
    }
</style>
