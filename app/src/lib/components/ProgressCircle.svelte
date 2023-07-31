<script>
  export let value = 0;
  export let max = 100;

  $: progressPath = () => {
    if (value <= 0) {
      return "";
    } else if (value >= max) {
      return "M50,5A45 45 0 1 1 49.9999 5";
    } else {
      const angle = Math.PI * 2 * (value / max);
      const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
      const y = 50 + Math.sin(angle - Math.PI / 2) * 45;

      let path = "M50,5";

      if (angle > Math.PI) {
        path += "A45 45 0 0 1 50 95";
      }

      path += `A45 45 0 0 1 ${x} ${y}`;

      return path;
    }
  };
</script>

<svg viewBox="0 0 100 100">
  <path
    class="stroke-primary-dark stroke-[9px]"
    d="M50,5A45 45 0 1 1 49.9999 5" />
  <path class="stroke-kupfer stroke-[10px]" d={progressPath()} />
  <slot />
</svg>

<style>
  svg {
    fill: var(--progress-fill, transparent);
    height: 100%;
    stroke-linecap: var(--progress-linecap, round);
    width: 100%;
  }
</style>
