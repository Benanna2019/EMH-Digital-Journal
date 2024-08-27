<script>
    import { goto } from "$app/navigation";
    import { Hanko } from "@teamhanko/hanko-elements";
    import { page } from "$app/stores";
	  import HankoAuth from "../Hanko/HankoAuth.svelte";
    import GhostButton from "../Buttons/GhostButton.svelte";
    import SigninDialog from "../SigninDialog.svelte";
    import LoadingSpinner from "../LoadingSpinner.svelte";
    import HankoProfile from "../Hanko/HankoProfile.svelte";
	import UserProfileDialog from "../UserProfileDialog.svelte";

    let showModal = $state(false);
    let showProfile = $state(false);
  
    const hankoApi = import.meta.env.VITE_HANKO_API_URL;
  
    const hanko = new Hanko(hankoApi);

    let user = hanko.user.getCurrent()

    console.log("user: ",user);


    // if there isn't a current user, we want the a modal popup with the HankoAuth contents in it
    // if there is a current user, we want to render the profile button, either in a modal or 
    // get display some user data and when they click on it, it would take them to their profile page
  </script>

<div data-cy="sign-in-button" class="sticky bottom-0 z-10 flex items-center justify-center p-2 space-x-3 bg-white border-t filter-blur border-gray-150 bg-opacity-80 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60"
    >
  {#await user}
  <div class="flex items-center justify-center w-full py-1">
    <LoadingSpinner />
  </div>
  {:then user} 
    {#if !user}
      <GhostButton onclick={() => (showModal = true)} style={{ width: '100%' }}>
        Sign in
      </GhostButton>
    {:else}
      <GhostButton  onclick={() => (showProfile = true)}>
        {user.email}
      </GhostButton>
    {/if}
  {:catch error}
    <GhostButton onclick={() => (showModal = true)} style={{ width: '100%' }}>
      Sign in
    </GhostButton>
  {/await}
</div>

{#snippet header()}
  <h2>
    Sign in
  </h2>
{/snippet}

<SigninDialog bind:showModal {header}>
	<HankoAuth></HankoAuth>
</SigninDialog>

<UserProfileDialog bind:showProfile {header}>
  <HankoProfile></HankoProfile>
</UserProfileDialog>

    
<!--   
    if (loading) {
      return (
        <Container>
          <div className="flex items-center justify-center w-full py-1">
            <LoadingSpinner />
          </div>
        </Container>
      )
    }
  
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