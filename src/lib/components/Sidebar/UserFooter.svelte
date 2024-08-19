<script>
    import { goto } from "$app/navigation";
    import { Hanko } from "@teamhanko/hanko-elements";
    import { page } from "$app/stores";
  
    const hankoApi = import.meta.env.VITE_HANKO_API_URL;
  
    const hanko = new Hanko(hankoApi);
  
    const user = () => {
      hanko.user.getCurrent()
    };
    // if there isn't a current user, we want the a modal popup with the HankoAuth contents in it
    // if there is a current user, we want to render the profile button, either in a modal or 
    // get display some user data and when they click on it, it would take them to their profile page
  </script>


<!-- Below is the react version of this component -->
 <!-- I need to replace authik with Hanko hooks/methods -->
  <!-- I also need to pass the isopen state to the component -->


<!-- export function UserFooter() {
    const { data, loading, error } = useViewerQuery()
    const { setIsOpen } = React.useContext(GlobalNavigationContext)
  
    function signInButton() {
      return (
        <GhostButton
          onClick={() =>
            authik.loginWithTwitter({ returnTo: window.location.pathname })
          }
          style={{ width: '100%' }}
        >
          Sign in
        </GhostButton>
      )
    }
  
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
          <Link
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
          </Link>
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