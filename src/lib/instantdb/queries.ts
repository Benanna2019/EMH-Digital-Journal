import { db } from './db';
import { useQuery } from './useQuery.svelte';
export const userByAuthIdQuery = (authId: string) => {
	return {
		query: {
			users: {
				$: {
					where: {
						userId: authId
					}
				},
				todos: {}
			}
		}
	};
};
