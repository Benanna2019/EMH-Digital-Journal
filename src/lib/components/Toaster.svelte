<script lang="ts">
	import { getToastState } from '$lib/store/ToastContext.svelte';
	import Toast from '$lib/components/Toast.svelte';

	const toastState = getToastState();
</script>

<div class="absolute right-2 top-2 flex flex-col gap-2">
	{#each toastState.toasts as toast}
		<Toast {toast} />
	{/each}
</div>
