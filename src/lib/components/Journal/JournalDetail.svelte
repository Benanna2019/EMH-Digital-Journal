<script lang="ts">
	import Detail from '$lib/components/ListDetail/Detail.svelte';
	import { TitleBar } from '$lib/components/ListDetail/TitleBar.svelte';
	import { MarkdownRenderer } from '$lib/components/MarkdownRenderer.svelte';
	import { timestampToCleanTime } from '$lib/transformers';
	import { PostActions } from './PostActions.svelte';
	import { PostSEO } from './PostSEO.svelte';
	import { getPost } from '$lib/api/posts'; // Assume this is your API function

	export let slug: string;

	let scrollContainerRef: HTMLElement;
	let titleRef: HTMLElement;
	let post: any;
	let error: any;
	let loading = true;

	$: {
		getPost(slug).then(
			(result) => {
				post = result;
				loading = false;
			},
			(err) => {
				error = err;
				loading = false;
			}
		);
	}

	$: publishedAt = post ? timestampToCleanTime({ timestamp: post.publishedAt }) : null;
</script>

{#if loading}
	<Detail.Loading />
{:else if !post || error}
	<Detail.Null />
{:else}
	<PostSEO {post} />
	<Detail.Container data-cy="post-detail" bind:this={scrollContainerRef}>
		<TitleBar
			backButton={true}
			globalMenu={false}
			backButtonHref="/writing"
			magicTitle={true}
			title={post.title}
			bind:titleRef
			{scrollContainerRef}
		/>

		<Detail.ContentContainer>
			<Detail.Header>
				{#if post.slug !== 'campsite'}
					<div class="mb-6 flex justify-center md:mb-12">
						<div class="mx-auto w-full max-w-3xl">
							<Campsite referrer="/post" />
						</div>
					</div>
				{/if}
				<Detail.Title bind:this={titleRef}>{post.title}</Detail.Title>
				<span title={publishedAt.raw} class="text-tertiary inline-block leading-snug">
					{publishedAt.formatted}
				</span>
			</Detail.Header>

			<MarkdownRenderer class="prose mt-8">
				{post.text}
			</MarkdownRenderer>

			<!-- bottom padding to give space between post content and comments -->
			<div class="py-6" />
		</Detail.ContentContainer>
	</Detail.Container>
{/if}
