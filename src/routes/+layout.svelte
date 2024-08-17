<script lang="ts">
	import '../tailwind.css';
	import { globalNavigation } from '$lib/store/GlobalNavContext';
	import { setContext } from 'svelte';

	setContext('GlobalNavigation', globalNavigation);
</script>

<slot />
