<script lang="ts">
	import '../styles/custom-styles.css';
	import '../styles/prose.css';
	import '../styles/dracula.css';
	import { setContext } from 'svelte';
	import { createNavState, type NavState } from '$lib/store/GlobalNavContext.svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/instantdb/db';

	let { children } = $props();

	//   let authInitialized = false;

	// 	onMount(() => {
	// 		db.subscribeAuth((auth) => {
	// 		console.log("auth in layout: ", auth);
	// 		if (auth.user) {
	// 			userStore.send({ type: "setUser", user: auth.user });
	// 			authInitialized = true;
	// 		}
	// 		authInitialized = false;
	// 		});
	// 	});

	const navState = createNavState(false);
	console.log('layout nav state: ', navState.isOpen);

	setContext<NavState>('navState', navState);
</script>

{@render children()}
