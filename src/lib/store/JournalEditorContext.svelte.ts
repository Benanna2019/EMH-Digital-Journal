import { getContext, setContext } from 'svelte';

type DraftState = {
	title: string;
	text: string;
	slug: string;
	excerpt: string;
};

export class EditorState {
	draftState = $state<DraftState>({ title: '', text: '', slug: '', excerpt: '' });
	existingJournalEntry = $state<any | null>(null);
	sidebarIsOpen = $state(false);
	isPreviewing = $state(false);

	// including filter state for journal list here cause it's easy

	constructor(initialJournalEntry: any = null) {
		if (initialJournalEntry) {
			this.existingJournalEntry = initialJournalEntry;
			this.draftState = {
				title: initialJournalEntry.title || '',
				text: initialJournalEntry.text || '',
				slug: initialJournalEntry.slug || '',
				excerpt: initialJournalEntry.excerpt || ''
			};
		}
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

	setExistingJournalEntry(journalEntry: any) {
		this.existingJournalEntry = journalEntry;
		this.draftState = { ...journalEntry };
	}

	setExistingJournalEntryId(id: string | null) {
		this.existingJournalEntry.id = id;
	}

	getExistingJournalEntry() {
		return this.existingJournalEntry;
	}

	// TODO: add a method for updating the existingPost based off of slug on journal/[slug]/+page.svelte
}

const EDITOR_KEY = Symbol('EDITOR');
const FILTER_KEY = Symbol('FILTER');
export function setEditorState(initialJournalEntry: any | null = null) {
	return setContext(EDITOR_KEY, new EditorState(initialJournalEntry));
}

export function getEditorState() {
	return getContext<EditorState>(EDITOR_KEY);
}

export class FilterState {
	filter = $state<'published' | 'draft'>('published');

	setFilter(filter: 'published' | 'draft') {
		this.filter = filter;
	}

	getFilter() {
		return this.filter;
	}
}

export function setFilterState() {
	return setContext(FILTER_KEY, new FilterState());
}

export function getFilterState() {
	return getContext<FilterState>(FILTER_KEY);
}
