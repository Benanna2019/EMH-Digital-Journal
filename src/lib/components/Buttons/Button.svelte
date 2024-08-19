<script lang="ts">
    import BaseButton from "./BaseButton.svelte"
    import { composer, baseClasses } from "./button-helpers"

    let props = $props()

    const classes = `text-gray-700 hover:text-gray-1000 shadow-xs bg-white border border-gray-400 border-opacity-30 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-white dark:bg-opacity-10 dark:text-gray-200 dark:hover:text-white hover:border-opacity-50 hover:shadow-sm`
    const size = composer.getSize(props.size)
    const opacity = composer.getOpacity(props.disabled)
    const radius = composer.getRadius(props.size)
    const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
</script>

<BaseButton size={size} opacity={opacity} radius={radius} class={composed} {...props}>
    {@render props.children()}
</BaseButton>