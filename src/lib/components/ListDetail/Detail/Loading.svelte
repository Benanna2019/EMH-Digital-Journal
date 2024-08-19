<script lang="ts">
    import Container from './ContentContainer.svelte'
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'
</script>

<Container>
    <div class="flex flex-1 flex-col items-center justify-center">
      <LoadingSpinner />
    </div>
  </Container>