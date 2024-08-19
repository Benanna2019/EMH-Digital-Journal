<script lang="ts">
    import BaseButton from "./BaseButton.svelte"
    import { composer, baseClasses } from "./button-helpers"

    let props = $props()

    const classes = `text-white hover:text-white shadow-xs bg-blue-500 border border-blue-600 dark:border-blue-400 dark:border-opacity-50 hover:shadow-sm`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
</script>

<BaseButton size={size} opacity={opacity} radius={radius} class={composed} {...props}>
    {@render props.children()}
</BaseButton>