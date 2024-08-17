import { createStore } from '@xstate/store';

import { derived, readable } from 'svelte/store';

export const store = createStore(
	// Initial context
	{ isOpen: false },
	// Transitions
	{
		OPEN: {
			isOpen: () => true
		},
		CLOSE: {
			isOpen: () => false
		},
		TOGGLE: {
			isOpen: (context) => !context.isOpen
		}
	}
);

const storeState = readable(store.getSnapshot());

export const globalNavigation = {
	isOpen: derived(storeState, ($state) => $state.context.isOpen),
	toggle: () => store.send({ type: 'TOGGLE' })
};

export type GlobalNavigation = typeof globalNavigation;
