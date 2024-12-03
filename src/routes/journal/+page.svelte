<script lang="ts">
	import ListDetailView from '$lib/components/Layout/ListDetailView.svelte';
	import SiteLayout from '$lib/components/Layout/SiteLayout.svelte';
	import JournalList from '$lib/components/Journal/JournalList.svelte';

	import { db, tx, id, type Todo } from '$lib/instantdb/db';
	import { onMount } from 'svelte';
	import { setFilterState } from '$lib/store/JournalEditorContext.svelte';

	// Implement a very simple version of some of Brian Lovin's site
	// Inject 'templates' for journals. Should probably just be markdown that can be edited
	// Find Markdown renderer's for svelte
	//

	let todos: Todo[] = $state([]);
	let form_state = $state({ name: '' });

	onMount(() => {
		db.subscribeQuery({ todos: {} }, (resp) => {
			if (resp.error) {
				console.error('error', resp.error); // Pro-tip: Check you have the right appId!
				return;
			}
			if (resp.data) {
				todos = resp.data.todos
					.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0))
					.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
			}
		});
	});

	function toggle(todo: Todo) {
		db.transact([tx.todos[todo.id].update({ completed: !todo.completed })]);
	}

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		db.transact([
			tx.todos[id()].update({
				name: form_state.name,
				completed: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			})
		]);
		form_state.name = '';
	}

	setFilterState();
</script>

<SiteLayout>
	<ListDetailView {list} hasDetail={false} detail={null} />
</SiteLayout>

{#snippet list()}
	<JournalList />
{/snippet}
