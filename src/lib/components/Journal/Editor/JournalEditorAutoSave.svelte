<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { editJournalEntry } from '$lib/instantdb/mutations';

	import { getEditorState } from '$lib/store/JournalEditorContext.svelte';

	let editorContext = getEditorState();

	let existingJournalEntry = editorContext.getExistingJournalEntry();
	let draftState = editorContext.getDraft();

	let loading = $state(false);

	let interval = $state<NodeJS.Timeout | string | number | undefined>();

	function autoSave() {
		if (!existingJournalEntry?.id) return;

		loading = true;
		editJournalEntry(existingJournalEntry.id, {
			title: draftState.title,
			text: draftState.text,
			slug: draftState.slug,
			excerpt: draftState.excerpt
		});
		loading = false;
		//   .catch((error: any) => console.error('Auto-save failed:', error))
		//   .finally(() => loading = false);
	}

	onMount(() => {
		interval = setInterval(autoSave, 30000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#if loading}
	<LoadingSpinner />
{/if}
