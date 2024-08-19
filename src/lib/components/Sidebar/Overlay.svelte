<script lang="ts">
	let { sidebar = $bindable() }: { sidebar: boolean} = $props();
</script>

<div
	aria-roledescription="show-sidebar"
	role="button"
	tabindex="0"
	class="fixed inset-0 z-20 bg-black bg-opacity-10 transition duration-200 ease-in-out dark:bg-opacity-50 {sidebar
		? 'pointer-events-auto opacity-100'
		: 'pointer-events-none opacity-0'}"
	onclick={() => sidebar = !sidebar}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			sidebar = !sidebar
		} 
	}}
></div>
