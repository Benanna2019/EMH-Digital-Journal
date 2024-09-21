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

	// TODO: add a method for updating the existingPost based off of slug on journal/[slug]/+page.svelte
}

const EDITOR_KEY = Symbol('EDITOR');

export function setEditorState() {
	return setContext(EDITOR_KEY, new EditorState());
}

export function getEditorState() {
	return getContext<EditorState>(EDITOR_KEY);
}
