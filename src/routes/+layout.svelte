<script lang="ts">
	import '../styles/custom-styles.css';
	import '../styles/prose.css';
	import '../styles/dracula.css';
	import { setContext } from 'svelte';
	import { createNavState, type NavState } from '$lib/store/GlobalNavContext.svelte';
	import { setToastState } from '$lib/store/ToastContext.svelte';

	let { children } = $props();

	const navState = createNavState(false);

	setContext<NavState>('navState', navState);
	setToastState();
</script>

{@render children()}
