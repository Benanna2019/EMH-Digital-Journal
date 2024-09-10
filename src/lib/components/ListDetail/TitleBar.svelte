<script lang="ts">
	import { ArrowLeftIcon, MenuIcon, XIcon } from 'svelte-feather-icons';
	import { getContext } from 'svelte';
	import { type NavState } from '$lib/store/GlobalNavContext.svelte';

	const navState = getContext<NavState>('navState');

	const toggleNavStateOpen = () => {
		navState.isOpen = !navState.isOpen;
		console.log('nav state in toggle', navState.isOpen);
	};

	console.log('nav state from title bar: ', navState.isOpen);

	type Props = {
		isOpen?: boolean;
		toggleIsOpen?: () => void;
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
		isOpen,
		title,
		globalMenu = true,
		toggleIsOpen,
		backButton = false,
		backButtonHref = '',
		magicTitle = false,
		titleRef = null,
		scrollContainerRef = null,
		leadingAccessory = null,
		trailingAccessory = null,
		children
	}: Props = $props();

	const darkMode = $state(false);
	const offset = $state(200);
	const opacity = $state(0);
	const currentScrollOffset = $state(0);
</script>

<div
	style:background={`rgba(${darkMode ? '50,50,50' : '255,255,255'},${
		currentScrollOffset === 0
			? currentScrollOffset
			: darkMode
				? currentScrollOffset + 0.5
				: currentScrollOffset + 0.8
	})`}
	style:box-shadow={`0 1px 3px rgba(0,0,0,${currentScrollOffset})`}
	style:min-height="48px"
	class="filter-blur sticky top-0 z-10 flex flex-col justify-center px-3 py-2 dark:border-b dark:border-gray-900"
>
	<div class="flex flex-none items-center justify-between">
		<span class="flex items-center space-x-3">
			{#if globalMenu}
				<span
					aria-roledescription="Toggle menu"
					role="button"
					tabindex={0}
					onclick={() => {
						console.log('clicked');
						// @ts-ignore
						toggleNavStateOpen();
					}}
					onkeydown={() => {
						console.log('keydown');
						toggleIsOpen?.();
					}}
					class="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-200 lg:hidden"
				>
					<!-- For my future reference, when I was adding this component by itself initially -->
					<!-- Meaning I just had the sidebar component, this title bar would never show because the 'titlebar' -->
					<!-- That was apart of the sidebar would disappear -->
					<!-- But now that the page component has a title bar, whenever the sidebar dissappears -->
					<!-- the menu icon is there because there is still a page with a title bar mounted -->
					{#if navState.isOpen}
						<XIcon size="16" class="text-primary" />
					{:else}
						<MenuIcon size="16" class="text-primary" />
					{/if}
				</span>
			{/if}

			{#if backButton}
				<a
					href={backButtonHref}
					class="text-primary flex items-center justify-center rounded-md p-2 hover:bg-gray-200 lg:hidden dark:hover:bg-gray-800"
				>
					<ArrowLeftIcon size="16" class="text-primary" />
				</a>
			{/if}

			{#if leadingAccessory}
				{@render leadingAccessory()}
			{/if}

			<!-- Put magic title here -->
			<!-- Use the scroll driven link below and check if this is the 'magic title' -->
			<!-- https://scroll-driven-animations.style/demos/cover-to-fixed-header/css/ -->

			<!-- style:transform="`{magicTitle ? translateY({offset}%) : ""}`" 
				style:opacity="`{magicTitle ? {opacity} : ""}" -->
			<h2
				class="text-primary line-clamp-1 transform-gpu text-sm font-bold dark:text-white {magicTitle
					? 'translateY(' + offset + '%) opacity-' + opacity
					: ''}"
			>
				{title}
			</h2>
		</span>

		{#if trailingAccessory}
			{@render trailingAccessory()}
		{/if}
	</div>

	<div>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
