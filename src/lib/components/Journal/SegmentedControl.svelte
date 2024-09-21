<script lang="ts">
	// learned from https://samuelkraft.com/blog/segmented-control-framer-motion

	type Item = {
		id: string;
		label: string;
	};

	type SegmentedControlProps = {
		onSetActiveItem: Function;
		items: Array<Item>;
		active: String;
	};

	const { active, items, onSetActiveItem }: SegmentedControlProps = $props();

	let activeItem = $state(active);
	let isActive = $state(false);

	// I think I need to set context in some form for the active item
	// rather than passing state and things or I can try doing component composition up in the writing title bar

	//   function onChange(i) {
	//     activeItem = (items[i].id)
	//     onSetActiveItem(items[i].id)
	//   }
</script>

<ol class="flex list-none rounded-md bg-black bg-opacity-5 p-1 dark:bg-white dark:bg-opacity-5">
	{#each items as { id, label }}
		<li class="relative flex-1 leading-none">
			<button
				type="button"
				onclick={() => {
					activeItem = id;
					onSetActiveItem(id);
				}}
				class={`relative w-full cursor-pointer bg-transparent px-4 py-1.5 text-xs font-semibold leading-none ${
					id === activeItem
						? `text-black text-opacity-100 dark:text-white`
						: `text-black text-opacity-60 hover:text-opacity-100 dark:text-white`
				}`}
			>
				{#if id === activeItem}
					<div
						class="z-1 absolute bottom-0 left-0 right-0 top-0 rounded bg-white shadow-sm content-none dark:bg-gray-700"
					></div>
				{/if}
				<span class="z-2 relative">{label}</span>
			</button>
		</li>
	{/each}
</ol>
