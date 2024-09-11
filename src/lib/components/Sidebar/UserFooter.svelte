<script lang="ts">
	import GhostButton from '../Buttons/GhostButton.svelte';
	import SigninDialog from '../SigninDialog.svelte';
	import UserProfileDialog from '../UserProfileDialog.svelte';
	import { db, id, tx } from '$lib/instantdb/db';
	import { onMount } from 'svelte';
	import { useAuth } from '$lib/instantdb/useAuth.svelte';
	import { useUser } from '$lib/instantdb/useUser.svelte';
	import Container from '../ListDetail/Detail/Container.svelte';
	import LoadingSpinner from '../LoadingSpinner.svelte';

	let googAuthURI = $state('');

	onMount(() => {
		if (typeof window === 'undefined') return;
		googAuthURI = db.auth.createAuthorizationURL({
			clientName: 'google-web',
			redirectURL: window.location.href
		});
	});

	let authInitialized = $state(false);
	let renderMagicCodePage = $state(false);
	let email = $state('');

	// let user: User | null = $state(null);

	const auth = useAuth(db);

	let user = useUser(db);

	$inspect('userState', user.state);

	// const userQuery = useQuery(db, userByAuthId());

	// $effect(() => {
	// 	if (auth.state.user) {
	// 		const { query } = userByAuthIdQuery(auth.state.user.id);
	// 		const userQuery = useQuery(db, query);
	// 		$inspect('userQuery', userQuery.state.data);
	// 		user = auth.state.user;
	// 		authInitialized = true;
	// 	}
	// });

	function handleSignOut() {
		db.auth.signOut();
		// user = null;
		authInitialized = false;
	}

	async function handleSignIn(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		email = form.email.value;
		try {
			await db.auth.sendMagicCode({ email });
			renderMagicCodePage = true;
		} catch (error: unknown) {
			if (error instanceof Error && 'body' in error) {
				alert(`Error: ${(error as any).body?.message}`);
			} else {
				alert('An error occurred');
			}
		}
	}

	async function handleCodeSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const code = form.code.value || '';
		try {
			let response = await db.auth.signInWithMagicCode({ email, code });
			console.log('response: ', response);
			if (response.user) {
				db.transact([
					tx.users[id()].update({
						userId: response.user.id,
						email: response.user.email,
						createdAt: response.user.createdAt
					})
				]);
			}
		} catch (error: unknown) {
			if (error instanceof Error && 'body' in error) {
				alert(`Error: ${(error as any).body?.message}`);
			} else {
				alert('An error occurred');
			}
		}
	}

	let showModal = $state(false);
	let showProfile = $state(false);
</script>

<div
	data-cy="sign-in-button"
	class="filter-blur border-gray-150 sticky bottom-0 z-10 flex items-center justify-center space-x-3 border-t bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60"
>
	{#if user.state.isLoading}
		<Container>
			<div class="flex w-full items-center justify-center py-1">
				<LoadingSpinner />
			</div>
		</Container>
	{:else if !user.state.user}
		<GhostButton onclick={() => (showModal = true)} style={{ width: '100%' }}>Sign in</GhostButton>
	{:else}
		<GhostButton onclick={() => (showProfile = true)}>
			{user.state.userData?.email}
		</GhostButton>
	{/if}
</div>

{#snippet header()}
	<h2>Sign in</h2>
{/snippet}

{#snippet signinContent()}
	{#if !renderMagicCodePage}
		<div>
			<h3>Log in with a magic code:</h3>
			<form id="email-input-form" onsubmit={handleSignIn}>
				<input type="email" name="email" placeholder="Email" />
				<button type="submit">Send code</button>
			</form>
			<hr />
			<h3>Or use Google:</h3>
			<a href="${googAuthURI}">Sign in with Google</a>
			<div id="google-one-tap"></div>
		</div>
	{:else}
		<div>
			<form id="magic-code-form" onsubmit={handleCodeSubmit}>
				<h3>Check your email</h3>
				<p>We've sent a magic code to {email}. Enter it below to sign in.</p>
				<input type="text" name="code" placeholder="Magic Code" />
				<button type="submit">Verify code</button>
			</form>
		</div>
	{/if}
{/snippet}

<SigninDialog bind:showModal {header}>
	{@render signinContent()}
</SigninDialog>

<UserProfileDialog bind:showProfile {header} {handleSignOut} />

<!--   
    
  
    if (error) {
      return <Container>{signInButton()}</Container>
    }
  
    if (data?.viewer) {
      return (
        <Container>
          <a
            href={`/u/${data.viewer.username}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center flex-none rounded-full"
          >
            <Avatar
              user={data.viewer}
              src={data.viewer.avatar}
              width={24}
              height={24}
              layout="fixed"
              className="rounded-full"
            />
          </a>
          <GhostButton
            aria-label="Manage settings"
            onClick={() => setIsOpen(false)}
            size="small-square"
            href="/settings"
          >
            <Settings size={16} />
          </GhostButton>
        </Container>
      )
    }
  
    return <Container>{signInButton()}</Container>
  } -->
