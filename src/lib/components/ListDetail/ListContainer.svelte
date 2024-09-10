<script lang="ts">
	let props = $props();
</script>

<div
	class="relative h-full max-h-screen min-h-screen w-full flex-none overflow-y-auto border-r border-gray-150 bg-white lg:w-80 lg:bg-gray-50 xl:w-96 dark:border-gray-800 dark:bg-gray-900 lg:dark:bg-gray-900"
	{...props}
>
	{@render props.children()}
</div>
