<script lang="ts">
    import BaseButton from "./BaseButton.svelte"
    import { composer, baseClasses } from "./button-helpers"

    let props = $props()

    const classes = `bg-white border border-gray-200 dark:border-red-500 dark:hover:border-red-500  dark:bg-red-500 dark:border-opacity-20 dark:bg-opacity-10 text-red-500 hover:border-red-500 hover:text-white hover:bg-red-600 focus:bg-red-600 dark:focus:text-white`

    const size = composer.getSize(props.size)
    const opacity = composer.getOpacity(props.disabled)
    const radius = composer.getRadius(props.size)
    const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
</script>

<BaseButton size={size} opacity={opacity} radius={radius} class={composed} {...props}>
    {@render props.children()}
</BaseButton>