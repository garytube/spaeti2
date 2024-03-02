<script>
  export let user;
</script>

{#if user}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click
    class="ring-2 ring-yellow-200 ring-offset-primary ring-offset-2 rounded-full h-8 w-8 md:h-6 md:w-6 overflow-hidden {$$props.class}">
    <img
      class="block object-contain rounded-full"
      src={`http://127.0.0.1:8090/api/files/users/${user.id}/${user.avatar}`}
      alt={user.username} />
  </div>
{:else}
  <a href="/login">Login</a>
{/if}
