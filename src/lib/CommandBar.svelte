<script lang="ts">
  // system/lib/util imports

  // store imports
  //   import { system } from "./store"
  //   const { activeSection } = system

  // component imports
</script>

<div class="grid grid-cols-6 justify-between">
    <button>View - F3</button>
    <button>Edit - F4</button>
    <button>Copy - F5</button>
    <button>Move - F6</button>
    <button>New Folder - F7</button>
    <button>Delete - F8</button>
</div>

<style>
    button {
        cursor: theme("cursor.auto");
        font-size: theme("fontSize.sm");
        background-color: theme("colors.gray.100");
        border: 1px solid theme("colors.gray.300");
        padding: theme("padding.1") theme("padding.2");
    }

    button:hover {
        background-color: theme("colors.gray.200");
    }
</style>
