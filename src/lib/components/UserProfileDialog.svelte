<script lang="ts">
	import { createEventDispatcher, type Snippet } from "svelte";
	import GhostButton from "./Buttons/GhostButton.svelte";
	import { db } from "$lib/instantdb/db";
	import { goto } from "$app/navigation";

	let { showProfile = $bindable(), header, handleSignOut }: { showProfile: boolean, header: Snippet, handleSignOut: () => void } = $props(); // boolean

	let dialog: HTMLDialogElement

    $effect(() => {
        if (dialog && showProfile) {
            dialog.showModal();
        }
    })


</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showProfile = false)}
	
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={(e) => e.stopPropagation()}>
		{#if header}
          {@render header()}
        {/if}
		<hr />
		<GhostButton onclick={() => {
			handleSignOut()
			dialog.close()
		}}>
			Sign out
		  </GhostButton>

		<hr />
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
