<script lang="ts">
	import { goto } from '$app/navigation';
	import { SidebarIcon } from 'svelte-feather-icons';
	import slugify from 'slugify';

	import Button from '$lib/components/Buttons/Button.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import PostEditorAutoSave from './JournalEditorAutoSave.svelte';

	// Assuming these are defined elsewhere and imported

	// need to use the context I've set
	import { getContext } from 'svelte';
	import { getEditorState } from '$lib/store/PostEditorContext.svelte';
	import { addJournalEntry, editJournalEntry } from '$lib/instantdb/mutations';

	let editorContext = getEditorState();

	let isSavingDraft = $state(false);

	async function handleEditOrCreate() {
		isSavingDraft = true;
		try {
			if (editorContext.existingPost?.id) {
				editJournalEntry(editorContext.existingPost.id, editorContext.draftState);
			} else {
				const newPost = await addJournalEntry(editorContext.draftState);
				// find a better toast solution
				// toast.success('Draft created');
				goto(`/writing/${newPost.slug}/edit`);
			}
		} catch (error) {
			// find a better toast solution
			// toast.error('Failed to save post');
		} finally {
			isSavingDraft = false;
		}
	}

	function toggleSidebar() {
		console.log('toggle has been toggled');
		editorContext.toggleSidebar();
	}
</script>

<div class="flex items-center space-x-2">
	<Button disabled={isSavingDraft} on:click={handleEditOrCreate}>
		{#if isSavingDraft}
			<LoadingSpinner />
		{:else}
			<PostEditorAutoSave />
			<span>{editorContext.existingPost?.publishedAt ? 'Update' : 'Save draft'}</span>
		{/if}
	</Button>
	<Button onclick={toggleSidebar}>
		<SidebarIcon size="16" />
	</Button>
</div>
