<script lang="ts">
	import ListItem from '$lib/components/ListDetail/ListItem.svelte';
	import { timestampToCleanTime } from '$lib/transformers';

	const { entry, active }: Props = $props();

	interface Props {
		entry: any; // this is something I think should probably be on each of the templates
		active: boolean;
	}

	const publishedAt = timestampToCleanTime({ timestamp: entry.publishedAt });
</script>

<ListItem
	href={`/journal/${entry.slug}`}
	as={`/journal/${entry.slug}`}
	title={entry.title}
	description={undefined}
	byline={entry.publishedAt ? publishedAt.formatted : 'Draft'}
	{active}
/>
