<script lang="ts">
	import type { Snippet } from "svelte";

    let ref: HTMLDivElement;
  
    let { children = $bindable(), ...rest }: { children: Snippet} = $props()
    
  </script>
  
  <div bind:this={ref} id="main" class="relative flex max-h-screen w-full flex-col overflow-y-auto bg-white dark:bg-black" {...rest}>
    {@render children()}
  </div>