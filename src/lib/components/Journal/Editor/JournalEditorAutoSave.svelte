<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { editJournalEntry } from '$lib/instantdb/mutations';

	import { getContext } from 'svelte';
	import { getEditorState } from '$lib/store/PostEditorContext.svelte';

	let editorContext = getEditorState();

	let loading = $state(false);

	let interval = $state<NodeJS.Timeout | string | number | undefined>();

	function autoSave() {
		if (!editorContext.existingPost?.id) return;

		loading = true;
		editJournalEntry(editorContext.existingPost.id, {
			title: editorContext.draftState.title,
			text: editorContext.draftState.text,
			slug: editorContext.draftState.slug,
			excerpt: editorContext.draftState.excerpt
		});
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
