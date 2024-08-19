<script lang="ts">
    import BaseButton from "./BaseButton.svelte"
    import { composer, baseClasses } from "./button-helpers"

    let props = $props()

    const classes = `text-gray-700 hover:text-gray-1000 bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
</script>

<BaseButton size={size} opacity={opacity} radius={radius} class={composed} {...props}>
    {@render props.children()}
</BaseButton>