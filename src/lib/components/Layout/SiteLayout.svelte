<script lang="ts">
	import Sidebar from '../Sidebar/Sidebar.svelte';

	let { children = $bindable()}: { children: any} = $props();

	import { getContext } from 'svelte';
	import { type NavState } from '$lib/store/GlobalNavContext.svelte';

  	const navState = getContext<NavState>("navState");

	let isOpen = $state(navState.isOpen);

</script>

<div class="relative flex h-full min-h-screen w-full">
	<Sidebar  />

	<div class="flex flex-1">
		{@render children()}
	</div>
</div>
