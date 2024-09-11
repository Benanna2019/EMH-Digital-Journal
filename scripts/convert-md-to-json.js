import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function convertMarkdownToJson() {
	const templateDir = path.join(process.cwd(), 'src', 'journal-templates');
	const files = await fs.readdir(templateDir);

	const templates = await Promise.all(
		files
			.filter((file) => file.endsWith('.md'))
			.map(async (file) => {
				const content = await fs.readFile(path.join(templateDir, file), 'utf-8');
				const { data, content: body } = matter(content);
				return {
					...data,
					body,
					filename: file.replace('.md', '')
				};
			})
	);

	return console.log(templates);
}

await convertMarkdownToJson();
