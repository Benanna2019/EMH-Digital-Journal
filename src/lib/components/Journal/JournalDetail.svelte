<script lang="ts">
	import Container from '$lib/components/ListDetail/Detail/Container.svelte';
	import Null from '$lib/components/ListDetail/Detail/Null.svelte';
	import Loading from '$lib/components/ListDetail/Detail/Loading.svelte';
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
	import ContentContainer from '$lib/components/ListDetail/Detail/ContentContainer.svelte';
	import Header from '../ListDetail/Detail/Header.svelte';
	import JournalActions from './JournalActions.svelte';
	import { timestampToCleanTime } from '$lib/transformers';
	// Look into the PostSEO and see how to use the svelte:head tags
	// import { PostSEO } from './PostSEO.svelte';
	import { useQuery } from '$lib/instantdb/useQuery.svelte'; // Assume this is your API function
	import { journalEntryQuery } from '$lib/instantdb/queries';
	import { db } from '$lib/instantdb/db';
	import { marked } from 'marked';

	let { slug }: { slug: string } = $props();

	let scrollContainerRef: HTMLElement;
	// let titleRef: HTMLElement;

	let { query } = journalEntryQuery(slug);

	let journalQuery = useQuery(db, query);

	let publishedAt = journalQuery.state.data
		? timestampToCleanTime({ timestamp: journalQuery.state.data['journal-entries'][0].publishedAt })
		: null;
</script>

{#if journalQuery.state.isLoading}
	<Loading />
{:else if !journalQuery.state.data || journalQuery.state.error}
	<Null />
{:else}
	<!-- <PostSEO {post} /> -->
	<Container>
		<TitleBar
			backButton={true}
			globalMenu={false}
			backButtonHref="/writing"
			magicTitle={true}
			title={journalQuery.state.data}
			trailingAccessory={postActions}
			{scrollContainerRef}
		/>

		<ContentContainer>
			<Header>
				<h1 class="text-primary font-sans text-2xl font-bold xl:text-3xl">
					{journalQuery.state.data['journal-entries'][0].title}
				</h1>
				{#if publishedAt}
					<span title={publishedAt.raw} class="text-tertiary inline-block leading-snug">
						{publishedAt.formatted}
					</span>
				{/if}
			</Header>

			<div class="prose mt-8">
				{@html marked.parse(journalQuery.state.data['journal-entries'][0].text)}
			</div>

			<!-- bottom padding to give space between post content and comments -->
			<div class="py-6"></div>
		</ContentContainer>
	</Container>
{/if}

{#snippet postActions()}
	<JournalActions journalEntry={journalQuery.state.data['journal-entries'][0]} />
{/snippet}
