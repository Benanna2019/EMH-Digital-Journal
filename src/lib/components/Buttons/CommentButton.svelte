<script lang="ts">
    import BaseButton from "./BaseButton.svelte"
    import { composer, baseClasses } from "./button-helpers"

    let props = $props()

    const classes = `${
    props.disabled
      ? 'text-gray-500 border-gray-400 bg-white dark:border-gray-700'
      : 'border-blue-600 bg-blue-500 dark:bg-opacity-100 text-white hover:bg-blue-600 dark:border-blue-400'
  } shadow-xs bg-white border border-opacity-30 dark:bg-opacity-10 hover:border-opacity-50 hover:shadow-sm w-8 rounded`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
</script>

<BaseButton size={size} opacity={opacity} radius={radius} class={composed} {...props}>
    {@render props.children()}
</BaseButton>