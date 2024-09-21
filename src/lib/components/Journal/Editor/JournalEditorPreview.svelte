<script lang="ts">
	import ContentContainer from '$lib/components/ListDetail/Detail/ContentContainer.svelte';
	import Header from '$lib/components/ListDetail/Detail/Header.svelte';
	import Title from '$lib/components/ListDetail/Detail/Title.svelte';
	import { getEditorState } from '$lib/store/PostEditorContext.svelte';
	import { marked } from 'marked';

	const editorContext = getEditorState();

	$inspect('editor context', editorContext);

	const draft = editorContext.getDraft();
	const title = draft.title;

	console.log('draft', draft);

	const markdown = marked.parse(draft.text);
	console.log('markdown', markdown);
</script>

<ContentContainer>
	<Header>
		<h1 class="text-primary font-sans text-2xl font-bold xl:text-3xl">{title}</h1>
	</Header>

	<div class="prose">
		{@html markdown}
	</div>

	<!-- bottom padding to give space between post content and comments -->
	<div class="py-6"></div>
</ContentContainer>
