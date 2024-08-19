<script lang="ts">
	import type { Snippet } from "svelte";

interface BaseButtonProps {
    [key: string]: unknown
    size: string
    disabled?: boolean
    href?: string | null
    as?: string | null
    children: Snippet
  }
  
  type ButtonAsButton = BaseButtonProps & HTMLButtonElement
  
  type ButtonAsLink = BaseButtonProps & HTMLAnchorElement
  
  type ButtonProps = ButtonAsButton | ButtonAsLink


  let { href, as, size, disabled, children = $bindable(), ...props }: BaseButtonProps = $props()

</script>

{#if href && href.startsWith('/')}
    <a href={href} {...props}>{@render children()}</a>
{:else if href}
    <a href={href} target='_blank' rel='noopener noreferrer' {...props}>{@render children()}</a>
{:else}
    <button {...props}>{@render children()}</button>
{/if}