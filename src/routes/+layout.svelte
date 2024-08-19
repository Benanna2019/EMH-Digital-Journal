<script lang="ts">
	import '../styles/custom-styles.css';
	import '../styles/prose.css';
	import '../styles/dracula.css';
	import { setContext } from "svelte";
	import {createNavState, type NavState} from "$lib/store/GlobalNavContext.svelte"
	
	const navState = createNavState(false);

	console.log("layout nav state: ", navState.isOpen)

	setContext<NavState>("navState", navState);
</script>

<slot />
