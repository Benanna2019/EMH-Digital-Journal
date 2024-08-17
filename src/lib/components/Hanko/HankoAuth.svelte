<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { register } from '@teamhanko/hanko-elements';
	const hankoApi = import.meta.env.VITE_HANKO_API_URL;

	const redirectAfterLogin = () => {
		goto('/dashboard');
	};

	onMount(async () => {
		register(hankoApi).catch((error) => {
			// handle error
		});
	});
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin}></hanko-auth>
