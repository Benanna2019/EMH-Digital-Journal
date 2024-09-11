<script lang="ts">
	import ListContainer from '$lib/components/ListDetail/ListContainer.svelte';

	import LoadingSpinner from '../LoadingSpinner.svelte';
	import JournalListItem from './JournalListItem.svelte';
	import JournalTitlebar from './JournalTitlebar.svelte';
	import { db } from '$lib/instantdb/db';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';

	// rename templates in the db as entries
	// actually, keep templates but entries should probably replace templates
	// in this file.

	// The templates are solely for writing a new entry and using a template
	// to get the user started.

	let active = $state(false);
	let filter = $state<'published' | 'draft'>('published');

	const journalEntries = useQuery(db, { 'journal-entries': {} });

	$inspect(journalEntries);

	function toggleFilter() {
		filter = filter === 'published' ? 'draft' : 'published';
	}

	// const variables =
	// 	filter === 'published' ? { filter: { published: true } } : { filter: { published: false } };

	// probably need to iterate over templates since itll be an array
	// if (templates.length > 0) {
	// 	active = $page.url?.pathname === templates.slug;
	// }
</script>

{#if journalEntries.state.isLoading}
	<ListContainer>
		<JournalTitlebar {filter} />
		<div class="flex flex-1 items-center justify-center">
			<LoadingSpinner />
		</div>
	</ListContainer>
{:else if journalEntries.state.error}
	<ListContainer>
		<JournalTitlebar {filter} />
		<div class="flex flex-1 items-center justify-center">
			<p>{journalEntries.state.error.message}</p>
		</div>
	</ListContainer>
{:else if journalEntries.state?.data?.length === 0}
	<ListContainer>
		<JournalTitlebar {filter} />
		<div class="flex flex-1 items-center justify-center">
			<p>No entries found</p>
		</div>
	</ListContainer>
{:else}
	<ListContainer data-cy="posts-list">
		<JournalTitlebar {filter} />

		<div class="lg:space-y-1 lg:p-3">
			{#each journalEntries.state.data as entry}
				<JournalListItem post={entry} {active} />
			{/each}
		</div>
	</ListContainer>
{/if}
