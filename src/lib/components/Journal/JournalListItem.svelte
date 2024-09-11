<script lang="ts">
	import ListItem from '$lib/components/ListDetail/ListItem.svelte';
	import { timestampToCleanTime } from '$lib/transformers';

	const { post, active }: Props = $props();

	interface Props {
		post: any; // this is something I think should probably be on each of the templates
		active: boolean;
	}

	const publishedAt = timestampToCleanTime({ timestamp: post.publishedAt });
</script>

<ListItem
	href={`/writing/${post.slug}`}
	as={`/writing/${post.slug}`}
	title={post.title}
	description={undefined}
	byline={post.publishedAt ? publishedAt.formatted : 'Draft'}
	{active}
/>
