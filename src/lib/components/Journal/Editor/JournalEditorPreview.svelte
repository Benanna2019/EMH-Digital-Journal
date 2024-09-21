<script lang="ts">
	import { getContext } from 'svelte';
	import ContentContainer from '$lib/components/ListDetail/Detail/ContentContainer.svelte';
	import Header from '$lib/components/ListDetail/Detail/Header.svelte';
	import Title from '$lib/components/ListDetail/Detail/Title.svelte';
	import { type EditorContext } from '$lib/store/PostEditorContext.svelte';
	import { marked} from 'marked';

	import LoadingSpinner from '../../LoadingSpinner.svelte';

	const { draftState } = getContext<EditorContext>('editorContext');

	const markdown = marked.parse(draftState.text);
</script>

<ContentContainer>
	<Header>
		<Title>{draftState.title}</Title>
	</Header>
	
		{@html markdown}

	<!-- bottom padding to give space between post content and comments -->
	<div class="py-6"></div>
</ContentContainer>
