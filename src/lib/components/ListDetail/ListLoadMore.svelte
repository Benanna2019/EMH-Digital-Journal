<!-- <script lang="ts">
    import { onMount } from "svelte";


    let { root, isInViewProp }: { root: HTMLElement, isInViewProp: boolean } = $props()
  
    let isInView = $state(isInViewProp);
    let observer
    let element: HTMLElement
  
  
    const onChangeVisibility = (e: IntersectionObserverEntry[]) => {
      isInView = e[0].isIntersecting;
    };
  
    onMount(() => {
      let options = {
        root: root,
      };
  
      observer = new IntersectionObserver(onChangeVisibility, options);
      observer.observe(element);
    });
  </script>
  
  <div class="c" bind:this={element}>
    <slot {isInView} />
  </div> -->