<script lang="ts">
	import { getContext } from 'svelte';
	// import { Dropzone } from '~/components/Dropzone';
	// import { Textarea } from '~/components/Input';
	import Header from '$lib/components/ListDetail/Detail/Header.svelte';
	import ContentContainer from '$lib/components/ListDetail/Detail/ContentContainer.svelte';
	import { getEditorState } from '$lib/store/JournalEditorContext.svelte';

	let editorContext = getEditorState();

	const uploadingImagePlaceholder = '![](Uploading...)';

	function handleTitleChange(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		editorContext.updateDraft({ title: target.value });
	}

	function handleTextChange(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		editorContext.updateDraft({ text: target.value });
	}

	function onUploadComplete(url: string) {
		const image = `![](${url})`;
		editorContext.updateDraft({
			text: editorContext.draftState.text.replace(uploadingImagePlaceholder, image)
		});
	}

	function onUploadFailed() {
		editorContext.updateDraft({
			text: editorContext.draftState.text.replace(uploadingImagePlaceholder, '')
		});
	}

	function onUploadStarted() {
		editorContext.updateDraft({ text: editorContext.draftState.text + uploadingImagePlaceholder });
	}
</script>

<!-- Commented out Dropzone component
<Dropzone
  onUploadStarted={onUploadStarted}
  onUploadComplete={onUploadComplete}
  onUploadFailed={onUploadFailed}
>
-->
<ContentContainer>
	<Header>
		<textarea
			rows={1}
			value={editorContext?.getDraft().title}
			onchange={handleTitleChange}
			placeholder="Post title"
			class="composer text-primary block w-full border-none p-0 text-2xl font-bold focus:border-0 focus:outline-none focus:ring-0 md:text-3xl dark:bg-black"
		></textarea>
		<textarea
			rows={20}
			value={editorContext?.getDraft().text}
			onchange={handleTextChange}
			placeholder="Write a post..."
			class="composer text-primary prose block w-full border-none p-0 pt-5 text-lg font-normal focus:border-0 focus:outline-none focus:ring-0 dark:bg-black"
		></textarea>
	</Header>
</ContentContainer>
<!-- Commented out Dropzone closing tag
</Dropzone>
-->
