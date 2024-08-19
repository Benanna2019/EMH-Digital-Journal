<script lang="ts">
    let props = $props()
</script>

<div
      class="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8"
      {...props}
    >
    {@render props.children()}
</div>