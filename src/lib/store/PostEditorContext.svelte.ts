type DraftState = {
	title: string;
	text: string;
	slug: string;
	excerpt: string;
};

export const createEditorContext = (
	initialDraft: DraftState = { title: '', text: '', slug: '', excerpt: '' }
) => {
	let draftState = $state(initialDraft);
	let existingPost = $state<any | null>(null);
	let sidebarIsOpen = $state(false);
	let isPreviewing = $state(false);

	console.log('drafState: ', draftState)

	return {
		get draftState() {
			return draftState;
		},
		set draftState(value: DraftState) {
			draftState = value;
		},
		get existingPost() {
			return existingPost;
		},
		set existingPost(value: any | null) {
			existingPost = value;
		},
		get sidebarIsOpen() {
			return sidebarIsOpen;
		},
		set sidebarIsOpen(value: boolean) {
			sidebarIsOpen = value;
		},
		get isPreviewing() {
			return isPreviewing;
		},
		set isPreviewing(value: boolean) {
			isPreviewing = value;
		},
		updateDraft(partialDraft: Partial<DraftState>) {
			draftState = { ...draftState, ...partialDraft };
		}
	};
};

export type EditorContext = ReturnType<typeof createEditorContext>;
