<script>
	import ListDetailView from '$lib/components/Layout/ListDetailView.svelte';
	import SiteLayout from '$lib/components/Layout/SiteLayout.svelte';
	import JournalEditor from '$lib/components/Journal/Editor/JournalEditor.svelte';
	import { setEditorState } from '$lib/store/PostEditorContext.svelte';

	setEditorState();
</script>

{#snippet journalEditor()}
	<JournalEditor />
{/snippet}

<SiteLayout>
	<ListDetailView list={null} hasDetail detail={journalEditor} />
</SiteLayout>
