<script>
  import UserProfileMenu from "./UserProfileMenu.svelte";

  import Scanner from "$lib/components/scanner.svelte";
  import { goto } from "$app/navigation";
  import Logo from "$lib/components/Logo.svelte";
  import ShoppingCart from "$lib/components/ShoppingCart/ShoppingCart.svelte";
  import AutomaticReset from "$lib/components/AutomaticReset.svelte";
  import { product } from "$lib/store/productStore";
  import { PUBLIC_RESTTIME } from "$env/static/public";

  export let data;
</script>

<Scanner />
{#if $product.length > 0}
  <AutomaticReset timeout={parseInt(PUBLIC_RESTTIME)} />
{/if}
<header class=" flex items-center relative">
  <Logo class="p-4 lg:max-w-md mt-4 mx-auto" />
  <ShoppingCart />
  <UserProfileMenu
    on:click={() => goto("/login")}
    user={data.user}
    class="top-2 absolute right-2 md:right-4 md:top-4" />
</header>
<slot />
