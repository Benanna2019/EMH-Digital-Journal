<script lang="ts">
	import Container from '$lib/components/ListDetail/Detail/Container.svelte';
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
	import JournalEditorActions from './JournalEditorActions.svelte';
	import JournalEditorComposer from './JournalEditorComposer.svelte';
	import JournalEditorMetaSidebar from './JournalEditorMetaSidebar.svelte';
	import JournalEditorPreview from './JournalEditorPreview.svelte';
	import PreviewSwitch from './PreviewSwitch.svelte';
	import { getEditorState, setEditorState } from '$lib/store/JournalEditorContext.svelte';

	let { journalEntry }: { journalEntry?: any } = $props();

	if (journalEntry) {
		setEditorState(journalEntry);
	}

	let editorContext = getEditorState();
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
		backButtonHref="/journal"
		title=""
		trailingAccessory={postEditorActions}
		leadingAccessory={previewSwitch}
	/>

	{#if editorContext?.getIsPreviewing()}
		<JournalEditorPreview />
	{:else}
		<JournalEditorComposer />
	{/if}
</Container>

<JournalEditorMetaSidebar />
