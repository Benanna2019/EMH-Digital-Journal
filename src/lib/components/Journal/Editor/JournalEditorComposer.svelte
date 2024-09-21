<script lang="ts">
  import { getContext } from 'svelte';
  // import { Dropzone } from '~/components/Dropzone';
  // import { Textarea } from '~/components/Input';
  import Header from '$lib/components/ListDetail/Detail/Header.svelte';
  import ContentContainer from '$lib/components/ListDetail/Detail/ContentContainer.svelte';
  import { type EditorContext } from '$lib/store/PostEditorContext.svelte';


  let { draftState } = getContext<EditorContext>('editorContext');

  const uploadingImagePlaceholder = '![](Uploading...)';

  function handleTitleChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    draftState = { ...draftState, title: target.value };
  }

  function handleTextChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    draftState = { ...draftState, text: target.value };
  }

  function onUploadComplete(url: string) {
    const image = `![](${url})`;
    draftState = { ...draftState, text: draftState.text.replace(uploadingImagePlaceholder, image) };
    };
  

  function onUploadFailed() {
    draftState = { ...draftState, text: draftState.text.replace(uploadingImagePlaceholder, '') };
    }
  

  function onUploadStarted() {
    draftState = { ...draftState, text: draftState.text + uploadingImagePlaceholder };
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
        value={draftState.title}
        oninput={handleTitleChange}
        placeholder="Post title"
        class="block w-full p-0 text-2xl font-bold border-none composer text-primary focus:border-0 focus:outline-none focus:ring-0 dark:bg-black md:text-3xl"
      ></textarea>
      <textarea
        rows={20}
        value={draftState.text}
        oninput={handleTextChange}
        placeholder="Write a post..."
        class="block w-full p-0 pt-5 text-lg font-normal prose border-none composer text-primary focus:border-0 focus:outline-none focus:ring-0 dark:bg-black"
      ></textarea>
        </Header>
    </ContentContainer>
<!-- Commented out Dropzone closing tag
</Dropzone>
-->