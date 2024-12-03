<script lang="ts">
	import type { Snippet } from 'svelte';

	let { list, hasDetail, detail }: { list: Snippet; hasDetail: boolean; detail: Snippet } =
		$props();
</script>

<div class="flex w-full">
	{#if list}
		<div id="list" class={`bg-dots ${hasDetail ? 'hidden lg:flex' : 'min-h-screen w-full'}`}>
			{@render list()}
		</div>
	{/if}
	{#if detail}
		{@render detail()}
	{/if}
</div>
