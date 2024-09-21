<script lang="ts">
	import { setContext } from 'svelte';
	import Container from '$lib/components/ListDetail/Detail/Container.svelte';
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
	import JournalEditorActions from './JournalEditorActions.svelte';
	import JournalEditorComposer from './JournalEditorComposer.svelte';
	import JournalEditorMetaSidebar from './JournalEditorMetaSidebar.svelte';
	import JournalEditorPreview from './JournalEditorPreview.svelte';
	import PreviewSwitch from './PreviewSwitch.svelte';
	import { db } from '$lib/instantdb/db';
	import { useAuth } from '$lib/instantdb/useAuth.svelte';
	import { useQuery } from '$lib/instantdb/useQuery.svelte';
	import { journalEntryQuery } from '$lib/instantdb/queries';
	import { getEditorState, setEditorState } from '$lib/store/PostEditorContext.svelte';

	// should probably get this off of the url
	let slug = $state('');

	const entryQuery = journalEntryQuery(slug);
	let journalQuery = useQuery(db, entryQuery);

	const editorContext = getEditorState();

	console.log('editorContext in journal editor: ', editorContext);
</script>

{#snippet postEditorActions()}
	<JournalEditorActions />
{/snippet}

{#snippet previewSwitch()}
	<PreviewSwitch />
{/snippet}

<Container>
	<TitleBar
		backButton={true}
		globalMenu={false}
		backButtonHref="/writing"
		title=""
		trailingAccessory={postEditorActions}
		leadingAccessory={previewSwitch}
	/>

	{#if editorContext.getIsPreviewing()}
		<JournalEditorPreview />
	{:else}
		<JournalEditorComposer />
	{/if}
</Container>

<JournalEditorMetaSidebar />
