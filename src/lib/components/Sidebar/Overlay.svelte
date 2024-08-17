<script lang="ts">
	import type { GlobalNavigation } from '$lib/store/GlobalNavContext';
	import { getContext } from 'svelte';
	const { isOpen, toggle } = getContext<GlobalNavigation>('GlobalNavigation');
</script>

<div
	aria-roledescription="show-sidebar"
	tabindex="0"
	class="fixed inset-0 z-20 bg-black bg-opacity-10 transition duration-200 ease-in-out dark:bg-opacity-50 {$isOpen
		? 'pointer-events-auto opacity-100'
		: 'pointer-events-none opacity-0'}"
	onclick={toggle}
></div>
