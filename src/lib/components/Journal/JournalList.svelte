<script lang="ts">
	import ListContainer from '$lib/components/ListDetail/ListContainer.svelte';

	import LoadingSpinner from '../LoadingSpinner.svelte';
	import JournalListItem from './JournalListItem.svelte';
	import JournalTitlebar from './JournalTitlebar.svelte';
	import { db } from '$lib/instantdb/db';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';
	import { getFilterState } from '$lib/store/JournalEditorContext.svelte';

	let active = $state(false);

	let filterState = getFilterState();
	let filter = $derived(filterState.getFilter());

	let journalData = $state([]);
	let journalEntries = $state<any>({
		state: { isLoading: true, error: { message: '' }, data: null }
	});

	$effect(() => {
		journalEntries = useQuery(db, {
			'journal-entries': {
				$: {
					where: {
						status: filter
					}
				}
			}
		});
	});

	$effect(() => {
		if (journalEntries.state.data) {
			journalData = journalEntries.state.data['journal-entries'];
		}
	});
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
{:else if journalEntries.state?.data?.['journal-entries'].length === 0}
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
			{#each journalEntries.state.data['journal-entries'] as entry}
				<JournalListItem {entry} {active} />
			{/each}
		</div>
	</ListContainer>
{/if}
