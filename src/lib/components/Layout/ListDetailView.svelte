<script lang="ts">
	let { list, hasDetail, detail }: any = $props();
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
