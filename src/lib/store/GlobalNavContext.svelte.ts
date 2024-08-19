export const createNavState = (initialState = false) => {
	let isOpen = $state(initialState)
	return {
		get isOpen() {
		  return isOpen;
		},
		set isOpen(value) {
		  isOpen = value;
		},
	  };
}

export type NavState = ReturnType<typeof createNavState>