<script lang="ts">
	import { page } from '$app/stores';
	//   import { Plus } from 'lucide-svelte';
	//   import { GhostButton } from '~/components/Button.svelte';
	//   import { AddBookmarkDialog } from '~/components/Bookmarks/AddBookmarkDialog.svelte';
	import NavigationLink from './NavigationLink.svelte';
	//   import Icons from '$lib/components/Icons';

	let isAdmin = false;

	//   function ThisAddBookmarkDialog() {
	//     return (
	//       <AddBookmarkDialog
	//         trigger={
	//           <GhostButton aria-label="Add bookmark" size="small-square">
	//             <Plus size={16} />
	//           </GhostButton>
	//         }
	//       />
	//     );
	//   }

	const sections = [
		{
			label: null,
			items: [
				{
					href: '/',
					label: 'Home',
					//   icon: HomeIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname === '/',
					trailingAction: null,
					isExternal: false
				},

				{
					href: '/journal',
					label: 'Journal',
					//   icon: WritingIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname === '/journal',
					trailingAction: null,
					isExternal: false
				}
			]
		},
		{
			label: 'Me',
			items: [
				{
					href: '/bookmarks',
					label: 'Bookmarks',
					//   icon: BookmarksIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname.indexOf('/bookmarks') >= 0,
					//   Probably need to get creative with snippets here
					//   trailingAction: isAdmin ? ThisAddBookmarkDialog : null,
					isExternal: false
				},

				{
					href: '/todos',
					label: 'Todo Lists',
					//   icon: AMAIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname.includes('/todos'),
					trailingAction: null,
					isExternal: false
				}
			]
		},
		{
			label: 'Resources',
			items: [
				{
					href: 'https://rabbitroom.com',
					label: 'Rabbit Room',
					//   icon: TwitterIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://www.youtube.com/@therabbitroom1380',
					label: 'RR YouTube',
					//   icon: YouTubeIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://store.rabbitroom.com/',
					label: 'RR Store',
					//   icon: GitHubIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				}
			]
		}
	];
</script>

<div class="flex-1 space-y-1 px-3 py-3">
	{#each sections as section, i}
		<ul class="space-y-1">
			{#if section.label}
				<h4
					class="text-gray-1000 px-2 pb-2 pt-5 text-xs font-semibold text-opacity-40 dark:text-white"
				>
					{section.label}
				</h4>
			{/if}
			{#each section.items as item, j}
				<NavigationLink
					link={{
						...item
						//   trailingAction: item.href === '/bookmarks' && isAdmin ? ThisAddBookmarkDialog : null
					}}
				/>
			{/each}
		</ul>
	{/each}
</div>
