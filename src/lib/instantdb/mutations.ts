import { db, tx, id } from '$lib/instantdb/db';
import slugify from 'slugify';

const editJournalEntry = (
	existingPostId: any,
	draftState: any,
	status: 'draft' | 'published' = 'draft'
) => {
	const response = db.transact([
		tx['journal-entries'][existingPostId].update({
			title: draftState.title,
			text: draftState.text,
			updatedAt: new Date().toISOString(),
			publishedAt: status === 'published' ? new Date().toISOString() : undefined,
			slug: draftState.slug || slugify(draftState.title, { lower: true }),
			excerpt: draftState.excerpt,
			status
		})
	]);

	console.log('response: ', response);
	return response;
};

const addJournalEntry = async (
	draftState: any,
	userId: string,
	status: 'draft' | 'published' = 'draft'
) => {
	const slug = draftState.slug || slugify(draftState.title, { lower: true });
	const response = db.transact([
		tx['journal-entries'][id()]
			.update({
				title: draftState.title,
				text: draftState.text,
				createdAt: new Date().toISOString(),
				slug,
				excerpt: draftState.excerpt,
				status
			})
			.link({
				author: userId
			})
	]);
	console.log('response: ', response);
	return { slug };
};

export { editJournalEntry, addJournalEntry };
