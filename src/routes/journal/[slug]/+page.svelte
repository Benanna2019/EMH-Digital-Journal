<script lang="ts">
	import ListDetailView from '$lib/components/Layout/ListDetailView.svelte';
	import SiteLayout from '$lib/components/Layout/SiteLayout.svelte';
	import JournalEditor from '$lib/components/Journal/Editor/JournalEditor.svelte';
	import JournalDetail from '$lib/components/Journal/JournalDetail.svelte';
	import JournalList from '$lib/components/Journal/JournalList.svelte';
	import { page } from '$app/stores';
	import { journalEntryQuery } from '$lib/instantdb/queries';
	import { db } from '$lib/instantdb/db';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';
	import { getEditorState, setEditorState } from '$lib/store/JournalEditorContext.svelte';

	let slug = $derived($page.params.slug);

	let journalData = $state(null);
	let editorContext = $state({});
	let journalQuery = $state<any>({ state: { data: null } });

	$effect(() => {
		let { query } = journalEntryQuery(slug);
		journalQuery = useQuery(db, query);
	});

	$effect(() => {
		if (journalQuery && journalQuery.state.data) {
			journalData = journalQuery.state.data['journal-entries'][0];
			if (journalData) {
				setEditorState(journalData);
				editorContext = getEditorState();
			}
		}
	});
</script>

{#snippet list()}
	<JournalList />
{/snippet}

{#snippet detail()}
	{#if journalQuery.state.data && !journalQuery.state.data['journal-entries'][0].publishedAt}
		<JournalEditor journalEntry={journalQuery.state.data['journal-entries'][0]} />
	{:else if journalQuery.state.data}
		<JournalDetail slug={journalQuery.state.data['journal-entries'][0].slug} />
	{/if}
{/snippet}

<SiteLayout>
	<ListDetailView {list} hasDetail={true} {detail} />
</SiteLayout>
