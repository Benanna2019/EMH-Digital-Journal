<script lang="ts">
	// @ts-ignore
	import { PlusIcon, RadioIcon } from 'svelte-feather-icons';

	import GhostButton from '$lib/components/Buttons/GhostButton.svelte';
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';

	// Add in Andy Bell's Dialog Web Component
	// import { DialogComponent } from '../Dialog'
	import SegmentedControl from './SegmentedControl.svelte';
	import { db } from '$lib/instantdb/db';
	import { useAuth } from '$lib/instantdb/useAuth.svelte';

	let { filter }: { filter: 'published' | 'draft' } = $props();

	function handleFilterChange(filter: string) {
		filter = filter === 'published' ? 'draft' : 'published';
	}

	let auth = useAuth(db);
</script>

{#snippet getAddButton()}
	{#if auth.state.user}
		<GhostButton href="/journal/new" size="small-square" aria-label="Add post">
			<PlusIcon size="16" />
		</GhostButton>
	{/if}
{/snippet}

<TitleBar trailingAccessory={getAddButton} title="Journal">
	{#if auth.state.user}
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
