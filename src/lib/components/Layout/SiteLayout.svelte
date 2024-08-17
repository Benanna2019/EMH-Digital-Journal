<script lang="ts">
	import Sidebar from '../Sidebar/Sidebar.svelte';

	let { children }: { children: any } = $props();
</script>

<div class="relative flex h-full min-h-screen w-full">
	<Sidebar />

	<!-- <div class="flex flex-1">
		{@render children()}
	</div> -->
</div>
