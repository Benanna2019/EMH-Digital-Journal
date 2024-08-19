<script lang="ts">
    let props = $props()

    let ref: HTMLElement
</script>

<h1
      ref={ref}
      class="text-primary font-sans text-2xl font-bold xl:text-3xl"
      {...props}
    >{@html props.children()}</h1>