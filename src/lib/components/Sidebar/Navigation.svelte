<script lang="ts">
	import { page } from '$app/stores';
	//   import { Plus } from 'lucide-svelte';
	//   import { GhostButton } from '~/components/Button.svelte';
	//   import { AddBookmarkDialog } from '~/components/Bookmarks/AddBookmarkDialog.svelte';
	import NavigationLink from './NavigationLink.svelte';
	//   import Icons from '$lib/components/Icons';

	// Placeholder for Hanko integration
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

	console.log('$page.url', $page.url);

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
					href: '/writing',
					label: 'Writing',
					//   icon: WritingIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname === '/writing',
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
					href: '/ama',
					label: 'AMA',
					//   icon: AMAIcon,
					trailingAccessory: null,
					isActive:
						$page.url.pathname.indexOf('/ama') >= 0 &&
						!$page.url.pathname.startsWith('/ama/pending'),
					trailingAction: null,
					isExternal: false
				},

				{
					href: '/stack',
					label: 'Stack',
					//   icon: StackIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname.indexOf('/stack') >= 0,
					trailingAction: null,
					isExternal: false
				}
			]
		},
		{
			label: 'Projects',
			items: [
				{
					href: 'https://campsite.co',
					label: 'Campsite',
					//   icon: CampsiteIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://designdetails.fm',
					label: 'Design Details',
					//   icon: PodcastIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://staff.design',
					label: 'Staff Design',
					//   icon: StaffDesignIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://figma.com/@brian',
					label: 'Figma Plugins',
					//   icon: FigmaIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: '/security',
					label: 'Security Checklist',
					//   icon: SecurityChecklistIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname.indexOf('/security') >= 0,
					trailingAction: null,
					isExternal: false
				},

				{
					href: '/hn',
					label: 'Hacker News',
					//   icon: HackerNewsIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname.indexOf('/hn') >= 0,
					trailingAction: null,
					isExternal: false
				},

				{
					href: '/app-dissection',
					label: 'App Dissection',
					//   icon: AppDissectionIcon,
					trailingAccessory: null,
					isActive: $page.url.pathname === '/app-dissection',
					trailingAction: null,
					isExternal: false
				}
			]
		},
		{
			label: 'Online',
			items: [
				{
					href: 'https://twitter.com/brian_lovin',
					label: 'Twitter',
					//   icon: TwitterIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://www.youtube.com/channel/UC-esBYEUGQ6iK1wmw76f5MA',
					label: 'YouTube',
					//   icon: YouTubeIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://github.com/brianlovin',
					label: 'GitHub',
					//   icon: GitHubIcon,
					//   trailingAccessory: ExternalLinkIcon,
					isActive: false,
					trailingAction: null,
					isExternal: true
				},

				{
					href: 'https://figma.com/@brian',
					label: 'Figma',
					//   icon: FigmaIcon,
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
					class="px-2 pb-2 pt-5 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
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
