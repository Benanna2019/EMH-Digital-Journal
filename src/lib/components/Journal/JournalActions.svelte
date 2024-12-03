<script lang="ts">
	import Button from '$lib/components/Buttons/Button.svelte';
	import { db } from '$lib/instantdb/db';
	import { useAuth } from '$lib/instantdb/useAuth.svelte';

	let { journalEntry }: { journalEntry: { slug: string; [key: string]: any } } = $props();

	let auth = useAuth(db);
</script>

<div class="flex items-center space-x-2">
	{#if auth.state.user}
		<Button href={`/journal/${journalEntry.slug}/edit`}>Edit</Button>
	{/if}
</div>
