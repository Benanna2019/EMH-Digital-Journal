<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		active: boolean;
		href: string;
		as: string;
		description?: string;
		byline?: string;
		leadingAccessory?: Snippet;
		onClick?: (e: any) => void;
	}

	let { title, active, href, description, byline, leadingAccessory }: Props = $props();
</script>

<a
	{href}
	class="flex space-x-3 border-b border-gray-100 px-3.5 py-3 text-sm lg:rounded-lg lg:border-none lg:py-2 dark:border-gray-900 {active
		? 'bg-black dark:bg-gray-700'
		: 'sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800'}"
>
	<!-- Leading Accessory will probably be a snippet -->
	{#if leadingAccessory}
		{@render leadingAccessory()}
	{/if}

	<div class="flex flex-col justify-center space-y-1">
		<div
			class={`line-clamp-3 font-medium ${
				active ? 'text-white' : 'text-gray-1000 dark:text-gray-100'
			}`}
		>
			{title}
		</div>
		{#if description}
			<div
				class="line-clamp-2 {active
					? 'text-white text-opacity-80'
					: 'text-gray-1000 text-opacity-60 dark:text-white'}"
			>
				{description}
			</div>
		{/if}
		{#if byline}
			<div
				class={`line-clamp-1 ${
					active
						? 'text-white text-opacity-60'
						: 'text-gray-1000 text-opacity-40 dark:text-white dark:text-opacity-60'
				}`}
			>
				{byline}
			</div>
		{/if}
	</div>
</a>
