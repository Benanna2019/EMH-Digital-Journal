<script lang="ts">
  import { getContext } from 'svelte';
  import { XIcon } from 'svelte-feather-icons';
  import Button from '$lib/components/Buttons/Button.svelte';
  import GhostButton from '$lib/components/Buttons/GhostButton.svelte';
  import PrimaryButton from '$lib/components/Buttons/PrimaryButton.svelte';
  import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { editJournalEntry } from '$lib/instantdb/mutations';
	import { type EditorContext } from '$lib/store/PostEditorContext.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

  let { draftState, existingPost, sidebarIsOpen } = getContext<EditorContext>('editorContext');

  let scrollContainerRef;
  let editingPost = false;

  async function handlePublish() {
    if ($existingPost.publishedAt) return;

    editJournalEntry(existingPost.id, {...draftState, published: true })
  }

  async function handleUnpublish() {
    if (!existingPost.publishedAt) return;

    editJournalEntry(existingPost.id, {...draftState, published: false })
      
  }

  function handleSlugChange(e: any) {
    draftState = { ...draftState, slug: e.target.value };
  }

  function handleExcerptChange(e: any) {
    draftState = { ...draftState, excerpt: e.target.value };
  }
</script>

{#snippet trailingAccessory()}
  <GhostButton size="small-square" aria-label="Close details">
    <XIcon size="16" on:click={() => sidebarIsOpen = false} />
  </GhostButton>
{/snippet}

<nav
  bind:this={scrollContainerRef}
  class={`${
    sidebarIsOpen
      ? 'absolute inset-y-0 right-0 translate-x-0 shadow-lg'
      : 'absolute right-0 translate-x-full'
  } 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-l border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:w-56 2xl:w-72`}
>
  <TitleBar
    scrollContainerRef={scrollContainerRef}
    trailingAccessory={trailingAccessory}
    globalMenu={false}
    title="Details"
  />

  <div class="flex-1 space-y-4 px-3 py-3">
    <div class="flex flex-col space-y-1">
      <p class="text-primary text-sm font-semibold">Slug</p>
      <input
        placeholder="Slug"
        value={draftState.slug}
        onchange={handleSlugChange}
      />
    </div>

    <div class="flex flex-col space-y-1">
      <p class="text-primary text-sm font-semibold">Excerpt</p>
      <textarea
        value={draftState.excerpt}
        placeholder="Excerpt"
        rows={8}
        onchange={handleExcerptChange}
      ></textarea>
    </div>
  </div>

  <div class="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60">
    {#if existingPost?.id && !existingPost?.publishedAt}
      <PrimaryButton
        style="width: 100%"
        disabled={editingPost}
        on:click={handlePublish}
      >
        {#if editingPost}
          <LoadingSpinner />
        {:else}
          Publish
        {/if}
      </PrimaryButton>
    {/if}
    {#if existingPost?.id && existingPost?.publishedAt}
      <Button
        style="width: 100%"
        disabled={editingPost}
        on:click={handleUnpublish}
      >
        {#if editingPost}
          <LoadingSpinner />
        {:else}
          Unpublish
        {/if}
      </Button>
    {/if}
  </div>
</nav>

<div
  class={`fixed inset-0 z-20 bg-black bg-opacity-5 transition duration-200 ease-in-out dark:bg-opacity-50 ${
    sidebarIsOpen
      ? 'pointer-events-auto opacity-100'
      : 'pointer-events-none opacity-0'
  }`}
  role="button"
  tabindex="0"
  onclick={() => sidebarIsOpen = false}
  onkeypress={() => console.log('key pressed')}
></div>