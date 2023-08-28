<script>
	import NewEscrow from '$lib/components/NewEscrow.svelte';
	import PendingEscrow from '$lib/components/PendingEscrow.svelte';
	import ApprovedEscrows from '$lib/components/ApprovedEscrows.svelte';

	// /** @type {import('./$types').PageData} */
	// export let data;
</script>

<svelte:head>
	<title>Escrow</title>
	<meta name="description" content="Ethereum based Escrow" />
</svelte:head>

<div class="h-full flex">
	<div class="flex flex-row p-6 gap-8">
		<NewEscrow />
		<span class="divider-vertical h-120" />
		<PendingEscrow />
		<span class="divider-vertical h-120" />
		<ApprovedEscrows />
	</div>
</div>
