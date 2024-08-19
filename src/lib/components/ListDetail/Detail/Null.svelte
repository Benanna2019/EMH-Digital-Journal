<script lang="ts">
    import { CompassIcon } from "svelte-feather-icons";
    import Container from "./Container.svelte";
    import TitleBar from "../TitleBar.svelte";
	import Button from "$lib/components/Buttons/Button.svelte";
</script>


<Container>
    <TitleBar title="Not found" />
    <div class="flex flex-1 flex-col items-center justify-center space-y-6 px-8 text-center lg:px-16">
      <CompassIcon class="text-secondary" size="32" />
      <div class="flex flex-col space-y-1">
        <p class="text-primary font-semibold">
          What you seek does not exist.
        </p>
        <p class="text-tertiary">
          Maybe this link is broken. Maybe something was deleted, or moved. In
          any case, there’s nothing to see here...
        </p>
      </div>
      <Button href="/">Go home</Button>
    </div>
  </Container>