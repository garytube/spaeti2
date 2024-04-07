<script lang="ts">
	import { pb } from '../../../db';
	import type { PageData } from './$types';

	export let data: PageData;

	let drinks = pb.collection('drinks').getFullList();
</script>

<h1>Drink</h1>

Data
{#await drinks then drink}
	{JSON.stringify(drink)}
{/await}
