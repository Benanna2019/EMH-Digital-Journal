<script lang="ts">
	import { useAuth } from '$lib/instantdb/useAuth.svelte';
	import { db } from '$lib/instantdb/db';
	import { createEditorContext, type EditorContext } from '$lib/store/PostEditorContext.svelte';
	import { setContext } from 'svelte';

	let auth = useAuth(db);

	let { children } = $props();

	const editorContext = createEditorContext();
	console.log('layout editor context: ', editorContext);

	setContext<EditorContext>('editorContext', editorContext);
</script>

{@render children()}
