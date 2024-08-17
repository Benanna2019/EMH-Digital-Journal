<script lang="ts">
	import type { GlobalNavigation } from '$lib/store/GlobalNavContext';
	import { getContext } from 'svelte';
	import X from '../Icons/X.svelte';
	import Menu from '../Icons/Menu.svelte';
	const { isOpen, toggle } = getContext<GlobalNavigation>('GlobalNavigation');

	type Props = {
		title: string;
		globalMenu?: boolean;
		backButton?: boolean;
		backButtonHref?: string;
		magicTitle?: boolean;
		titleRef?: any;
		scrollContainerRef?: any;
		children?: any;
		leadingAccessory?: any;
		trailingAccessory?: any;
	};

	let {
		title,
		globalMenu = true,
		backButton = false,
		backButtonHref = '',
		magicTitle = false,
		titleRef = null,
		scrollContainerRef = null,
		leadingAccessory = null,
		trailingAccessory = null,
		children
	}: Props = $props();
</script>

<!-- onClick={() => setIsOpen(!isOpen)} -->
<!-- <X size={16} class="text-primary" />
                  <Menu size={16} class="text-primary" /> -->

<!-- style={{
          background: `rgba(${darkMode ? '50,50,50' : '255,255,255'},${
            currentScrollOffset === 0
              ? currentScrollOffset
              : darkMode
              ? currentScrollOffset + 0.5
              : currentScrollOffset + 0.8
          })`,
          box-shadow: `0 1px 3px rgba(0,0,0,${currentScrollOffset})`,
          minHeight: '48px',
        }} -->

<div
	class="filter-blur sticky top-0 z-10 flex flex-col justify-center px-3 py-2 dark:border-b dark:border-gray-900"
>
	<div class="flex flex-none items-center justify-between">
		<span class="flex items-center space-x-3">
			{#if globalMenu}
				<span
					class="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-200 lg:hidden dark:hover:bg-gray-800"
				>
					{#if $isOpen}
						<X on:click={toggle} />
					{:else}
						<svg
							on:click={toggle}
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6 text-black"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{/if}
				</span>
			{/if}

			{#if backButton}
				<a
					href={backButtonHref}
					class="text-primary flex items-center justify-center rounded-md p-2 hover:bg-gray-200 lg:hidden dark:hover:bg-gray-800"
				>
					<!-- <ArrowLeft size={16} class="text-primary" /> -->
				</a>
			{/if}

			{#if leadingAccessory}
				<div>{leadingAccessory}</div>
			{/if}

			<!-- Put magic title here -->
			<!-- Use the scroll driven link below and check if this is the 'magic title' -->
			<!-- https://scroll-driven-animations.style/demos/cover-to-fixed-header/css/ -->
			<h2 class="text-primary line-clamp-1 transform-gpu text-sm font-bold">
				{title}
			</h2>
		</span>

		{#if trailingAccessory}
			<div>{trailingAccessory}</div>
		{/if}
	</div>

	<div>
		{@render children()}
	</div>
</div>
