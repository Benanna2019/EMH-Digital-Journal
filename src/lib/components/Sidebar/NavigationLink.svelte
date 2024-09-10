<script lang="ts">
	type NavLink = {
		link: {
			href: string;
			label: string;
			icon?: any; // Replace 'any' with the correct type for your icons
			trailingAccessory?: any; // Replace 'any' with the correct type
			trailingAction?: any; // Replace 'any' with the correct type
			isActive: boolean;
			isExternal: boolean;
		};
	};

	const { link }: NavLink = $props();
	const {
		// sidebar = $bindable(false),
		href,
		label,
		icon: Icon,
		trailingAccessory: Accessory,
		trailingAction: Action,
		isActive,
		isExternal
	} = link;
</script>

<!-- pass the toggle function here from the sidebar component -->
<!--  onclick={() => (navState.isOpen = !navState.isOpen)} -->

<li class="flex items-stretch space-x-1">
	<a
		{href}
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium {isActive
			? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
			: 'text-gray-700 sm:hover:bg-gray-200 sm:hover:text-gray-900 dark:text-gray-200 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200'}"
	>
		<span class="flex w-4 items-center justify-center">
			<!-- <div bind:this={Icon} /> -->
		</span>
		<span class="flex-1">{label}</span>
		{#if Accessory}
			<span class="flex w-4 items-center justify-center text-black text-opacity-40 dark:text-white">
				<!-- <div bind:this={Accessory} /> -->
			</span>
		{/if}
	</a>
	{#if Action}
		<!-- <svelte:component this={Action} /> -->
	{/if}
</li>
