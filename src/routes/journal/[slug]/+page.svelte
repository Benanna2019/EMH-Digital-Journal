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

	let slug = $page.params.slug;

	let entryQuery = journalEntryQuery(slug);

	let journalQuery = useQuery(db, entryQuery);
</script>

{#snippet list()}
	<JournalList />
{/snippet}

{#snippet detail()}
	{#if journalQuery.state.data && !journalQuery.state.data.publishedAt}
		<JournalEditor {slug} />
	{:else}
		<JournalDetail {slug} />
	{/if}
{/snippet}

<SiteLayout>
	<ListDetailView {list} hasDetail={true} {detail} />
</SiteLayout>
