<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { editJournalEntry } from '$lib/instantdb/mutations';

  import { getContext } from 'svelte';
	import { type EditorContext } from '$lib/store/PostEditorContext.svelte';

  let { draftState, existingPost } = getContext<EditorContext>('editorContext')

  let loading = $state(false);

  let interval = $state<NodeJS.Timeout | string | number | undefined>();

  function autoSave() {
    if (!$existingPost?.id) return;

    loading = true;
    editJournalEntry(existingPost.id, {
      title: draftState.title,
      text: draftState.text,
      slug: draftState.slug,
      excerpt: draftState.excerpt,
    })
    //   .catch((error: any) => console.error('Auto-save failed:', error))
    //   .finally(() => loading = false);
  }

  onMount(() => {
    interval = setInterval(autoSave, 30000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

{#if loading}
  <LoadingSpinner />
{/if}