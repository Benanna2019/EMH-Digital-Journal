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
	import { createEditorContext, type EditorContext } from '$lib/store/PostEditorContext.svelte';

	const editorContext = createEditorContext();
	console.log('layout editor context: ', editorContext);

	// should probably get this off of the url
	let slug = $state('');

	const entryQuery = journalEntryQuery(slug);
	let journalQuery = useQuery(db, entryQuery);

	$effect(() => {
		if (journalQuery?.state.data) {
			let draftState = $state({
				title: journalQuery?.state.data?.title || '',
				text: journalQuery?.state.data?.text || '',
				slug: journalQuery?.state.data?.slug || '',
				excerpt: journalQuery?.state.data?.excerpt || ''
			});

			editorContext.existingPost = journalQuery?.state.data;
			editorContext.draftState = draftState;
			editorContext.sidebarIsOpen = false;
			editorContext.isPreviewing = false;
		}
	});

	setContext<EditorContext>('editorContext', editorContext);
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

	{#if editorContext.isPreviewing}
		<JournalEditorPreview />
	{:else}
		<JournalEditorComposer />
	{/if}
</Container>

<JournalEditorMetaSidebar />
