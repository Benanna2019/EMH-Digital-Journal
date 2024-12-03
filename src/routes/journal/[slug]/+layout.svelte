<script lang="ts">
	import { setFilterState } from '$lib/store/JournalEditorContext.svelte';

	let { children } = $props();

	setFilterState();
</script>

{@render children()}
