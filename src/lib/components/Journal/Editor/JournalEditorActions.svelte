<script lang="ts">
	import { goto } from '$app/navigation';
	import { SidebarIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';

	import Button from '$lib/components/Buttons/Button.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import PostEditorAutoSave from './JournalEditorAutoSave.svelte';

	import { getEditorState } from '$lib/store/JournalEditorContext.svelte';
	import { addJournalEntry, editJournalEntry } from '$lib/instantdb/mutations';
	import { getToastState } from '$lib/store/ToastContext.svelte';
	import { db } from '$lib/instantdb/db';
	import { useUser } from '$lib/instantdb/useUser.svelte';

	let editorContext = getEditorState();

	let isSavingDraft = $state(false);
	let toastState = getToastState();

	let userQuery = useUser(db);

	async function handleEditOrCreate() {
		isSavingDraft = true;
		let status: 'draft' | 'published' | undefined;
		if ($page.url.pathname.includes('/edit')) {
			status = editorContext.getExistingJournalEntry().status;
		}
		try {
			console.log('starting save');
			if (editorContext.existingJournalEntry?.id) {
				console.log('saving existing journal entry');
				editJournalEntry(
					editorContext.existingJournalEntry.id,
					editorContext.draftState,
					status || 'draft'
				);
				toastState.add('Draft updated', 'Your draft has been updated');
			} else {
				console.log('adding new journal entry');
				const newPost = await addJournalEntry(
					editorContext.draftState,
					userQuery.state.userData.id
				);
				console.log('new post: ', newPost);
				toastState.add('Draft created', 'Your draft has been created');
				// change this to go to the edit page once that route is made
				goto(`/journal/${newPost.slug}`);
			}
		} catch (error) {
			console.error('error: ', error);
			toastState.add('Failed to save post', 'Please try again');
		} finally {
			isSavingDraft = false;
		}
	}

	function toggleSidebar() {
		editorContext.toggleSidebar();
	}
</script>

<div class="flex items-center space-x-2">
	<Button disabled={isSavingDraft} onclick={handleEditOrCreate}>
		{#if isSavingDraft}
			<LoadingSpinner />
		{:else}
			<PostEditorAutoSave />
			<span>{editorContext?.existingJournalEntry?.publishedAt ? 'Update' : 'Save draft'}</span>
		{/if}
	</Button>
	<Button onclick={toggleSidebar}>
		<SidebarIcon size="16" />
	</Button>
</div>
