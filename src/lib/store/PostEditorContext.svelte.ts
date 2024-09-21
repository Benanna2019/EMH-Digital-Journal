import { getContext, setContext } from 'svelte';

type DraftState = {
	title: string;
	text: string;
	slug: string;
	excerpt: string;
};

export class EditorState {
	draftState = $state<DraftState>({ title: '', text: '', slug: '', excerpt: '' });
	existingPost = $state<any | null>(null);
	sidebarIsOpen = $state(false);
	isPreviewing = $state(false);

	constructor(initialJournalId: string | null = null) {
		this.existingPost.id = initialJournalId;
	}

	updateDraft(partialDraft: Partial<DraftState>) {
		this.draftState = { ...this.draftState, ...partialDraft };
	}

	toggleSidebar() {
		this.sidebarIsOpen = !this.sidebarIsOpen;
	}

	togglePreview() {
		this.isPreviewing = !this.isPreviewing;
	}

	getDraft() {
		return this.draftState;
	}

	getIsPreviewing() {
		return this.isPreviewing;
	}

	setExistingPost(post: any) {
		this.existingPost = post;
		this.draftState = { ...post };
	}

	setExistingPostId(id: string | null) {
		this.existingPost.id = id;
	}

	// TODO: add a method for updating the existingPost based off of slug on journal/[slug]/+page.svelte
}

const EDITOR_KEY = Symbol('EDITOR');

export function setEditorState(initialJournalId: string | null = null) {
	return setContext(EDITOR_KEY, new EditorState(initialJournalId));
}

export function getEditorState() {
	return getContext<EditorState>(EDITOR_KEY);
}
