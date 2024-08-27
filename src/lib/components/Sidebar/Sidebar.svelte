<script lang="ts">
	import TitleBar from '$lib/components/ListDetail/TitleBar.svelte';
	import SidebarNavigation from './Navigation.svelte';
	import SidebarOverlay from './Overlay.svelte';
	
	// let { isOpen = $bindable(false) }: { isOpen: boolean} = $props();

	import { getContext } from 'svelte';
	import { type NavState } from '$lib/store/GlobalNavContext.svelte';
	import UserFooter from './UserFooter.svelte';

  	const navState = getContext<NavState>("navState");

	let scrollContainerRef = $state<HTMLElement | null>(null);

</script>


<nav
	class="{navState.isOpen
		? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg'
		: 'absolute -translate-x-full'} 3xl:w-80 border-gray-150 z-30 
		flex h-full max-h-screen min-h-screen w-3/4 
		flex-none transform flex-col overflow-y-auto border-r
		 bg-white pb-10 transition duration-200 ease-in-out 
		 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 
		 lg:translate-x-0 lg:bg-gray-50 2xl:w-72 
		 dark:border-gray-800 dark:bg-gray-900 lg:dark:bg-gray-900 "
		
>
	<TitleBar  {scrollContainerRef} leadingAccessory={null} title="EMH - Digital" />
	<SidebarNavigation />
	<UserFooter />
</nav>



<SidebarOverlay bind:sidebar={navState.isOpen}/>
