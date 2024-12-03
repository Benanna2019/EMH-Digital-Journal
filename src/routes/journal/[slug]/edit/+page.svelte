<script lang="ts">
	import { page } from '$app/stores';
	import ListDetailView from '$lib/components/Layout/ListDetailView.svelte';
	import SiteLayout from '$lib/components/Layout/SiteLayout.svelte';
	import JournalEditor from '$lib/components/Journal/Editor/JournalEditor.svelte';
	import JournalList from '$lib/components/Journal/JournalList.svelte';
	import { journalEntryQuery } from '$lib/instantdb/queries';
	import { db } from '$lib/instantdb/db';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';
	import { getEditorState, setEditorState } from '$lib/store/JournalEditorContext.svelte';

	let slug = $derived($page.params.slug);

	let { query } = journalEntryQuery(slug);
	let journalQuery = useQuery(db, query);
</script>

{#snippet list()}
	<JournalList />
{/snippet}

{#snippet journalEditor()}
	{#if journalQuery.state.data}
		<JournalEditor journalEntry={journalQuery.state.data['journal-entries'][0]} />
	{:else}
		<div>Loading...</div>
	{/if}
{/snippet}

<SiteLayout>
	<ListDetailView {list} hasDetail={true} detail={journalEditor} />
</SiteLayout>
