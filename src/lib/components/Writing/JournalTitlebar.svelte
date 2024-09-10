<script lang="ts">
	import { PlusIcon, RadioIcon } from 'svelte-feather-icons';

	import GhostButton from '$lib/components/Buttons/GhostButton.svelte';
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
	// import { useViewerQuery } from '~/graphql/types.generated'

	// Add in Andy Bell's Dialog Web Component
	// import { DialogComponent } from '../Dialog'
	import SegmentedControl from './SegmentedControl.svelte';
	import { db } from '$lib/instantdb/db';
	import type { User } from '@instantdb/core';
	import { onMount } from 'svelte';
	// import { WritingSubscriptionForm } from './SubscriptionForm'

	// Need to pass toggle fn to the writing title bar
	// const { setFilter, filter } = React.useContext(WritingContext)

	let { filter }: { filter: 'published' | 'draft' } = $props();

	let authInitialized = $state(false);
	let user: User | null = $state(null);

	function handleFilterChange(filter: string) {
		filter = filter === 'published' ? 'draft' : 'published';
	}

	onMount(() => {
		db.subscribeAuth((auth) => {
			console.log('auth in layout: ', auth);
			if (auth.user) {
				user = auth.user;
				authInitialized = true;
			}
		});
	});
</script>

{#snippet getAddButton()}
	{#if user}
		<GhostButton href="/writing/new" size="small-square" aria-label="Add post">
			<PlusIcon size="16" />
		</GhostButton>
	{/if}
{/snippet}

<!-- {#snippet trailingAccessory()}
	<div class="flex space-x-2">
		{getAddButton()}
	</div>
{/snippet} -->

<TitleBar trailingAccessory={getAddButton} title="Writing">
	{#if user}
		<div class="pb-1 pt-2">
			<SegmentedControl
				onSetActiveItem={handleFilterChange}
				active={filter}
				items={[
					{ id: 'published', label: 'Published' },
					{ id: 'draft', label: 'Drafts' }
				]}
			/>
		</div>
	{/if}
</TitleBar>
