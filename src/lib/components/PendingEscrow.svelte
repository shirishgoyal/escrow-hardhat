<script>
	import { formatEther } from 'ethers';
	import { get } from 'svelte/store';
	import { signer, pendingEscrows, approveEscrow } from '$lib/store';

	async function handleSubmit(escrowAddress) {
		console.log(`Submitted ${escrowAddress}...`);
		await approveEscrow(escrowAddress, get(signer));
	}
</script>

<div class="escrow-pending flex flex-col gap-6">
	<h1 class="h3">Escrows awaiting my approval</h1>
	<div class="flex flex-col gap-4">
		{#each $pendingEscrows as item}
			<div class="card">
				<header class="card-header flex flex-row justify-between">
					<span>{item.address.slice(0, 8)}...</span><span>{formatEther(item.value)} ETH</span>
				</header>
				<footer class="card-footer mt-3">
					<button
						type="submit"
						id="approve"
						class="btn variant-filled-primary w-full"
						on:click={handleSubmit(item.address)}>Approve</button
					>
				</footer>
			</div>
		{/each}
	</div>
</div>
