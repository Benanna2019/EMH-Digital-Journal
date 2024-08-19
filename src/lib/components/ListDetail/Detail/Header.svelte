<script lang="ts">
    let props = $props()
</script>

<div class="space-y-3" {...props}>
    {@render props.children()}
</div>