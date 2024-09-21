import { db, tx, id } from '$lib/instantdb/db';
import slugify from 'slugify';

const editJournalEntry = (existingPost: any, draftState: any) => {
        db.transact([tx['journal-entries'][existingPost.id].update({ 
            title: draftState.title,
            text: draftState.text,
            updatedAt: new Date().toISOString(),
            slug: draftState.slug || slugify(draftState.title, { lower: true }),
            excerpt: draftState.excerpt,
         })]);
    }

    const addJournalEntry = async (draftState: any) => {
        const slug = draftState.slug || slugify(draftState.title, { lower: true });
        db.transact([tx['journal-entries'][id()].update({ 
            title: draftState.title,
            text: draftState.text,
            updatedAt: new Date().toISOString(),
            slug,
            excerpt: draftState.excerpt,
         })]);
         return {slug};
    }

    export { editJournalEntry, addJournalEntry };