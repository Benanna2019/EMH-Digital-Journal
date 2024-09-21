<script lang="ts">
  import { getContext } from 'svelte';
  import Switch from '$lib/components/Switch.svelte';
 import { type EditorContext } from '$lib/store/PostEditorContext.svelte';

  let { isPreviewing } = getContext<EditorContext>('editorContext');
</script>

<Switch
  label="Preview"
  defaultEnabled={isPreviewing}
  onChange={(event: any) => isPreviewing = event.detail}
/>