<script lang="ts">
	import ListContainer from '$lib/components/ListDetail/ListContainer.svelte';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';

	import LoadingSpinner from '../LoadingSpinner.svelte';
	import JournalListItem from './JournalListItem.svelte';
	import JournalTitlebar from './JournalTitlebar.svelte';
	import { page } from '$app/stores';
	import { db } from '$lib/instantdb/db';
	import { onMount } from 'svelte';

	// rename templates in the db as entries
	// actually, keep templates but entries should probably replace templates
	// in this file.

	// The templates are solely for writing a new entry and using a template
	// to get the user started.

	let active = $state(false);

	let templates = $state([]);
	let error = $state({ message: '' });
	let filter = $state<'published' | 'draft'>('published');

	onMount(() => {
		db.subscribeQuery({ 'journal-entries': {} }, (resp) => {
			if (resp.error) {
				error = resp.error;
				console.error('error', resp.error); // Pro-tip: Check you have the right appId!
				return;
			}
			if (resp.data) {
				// @ts-ignore
				templates = resp.data.templates;
			}
		});
	});

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

{#if error.message}
	<ListContainer>
		<div></div>
	</ListContainer>
{/if}

<!-- check if isloading comes back on a subscribed query -->
<!-- query.state.isLoading && -->
{#if !templates || templates.length === 0}
	<ListContainer>
		<JournalTitlebar {filter} />
		<div class="flex flex-1 items-center justify-center">
			<LoadingSpinner />
		</div>
	</ListContainer>
{/if}

{#if templates}
	<ListContainer data-cy="posts-list">
		<JournalTitlebar {filter} />

		<div class="lg:space-y-1 lg:p-3">
			{#each templates as post}
				<JournalListItem {post} {active} />
			{/each}
		</div>
	</ListContainer>
{/if}
