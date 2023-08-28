<script>
	import { formatEther } from 'ethers';
	import { approvedEscrows } from '$lib/store';
</script>

<div class="escrow-approved flex flex-col gap-6">
	<h1 class="h3">My approved escrows</h1>
	<div class="flex flex-wrap gap-4">
		{#each $approvedEscrows as item}
			<div class="card variant-filled-primary">
				<header class="card-header flex flex-row justify-between gap-4">
					<span>{item.address.slice(0, 8)}...</span><span>{formatEther(item.value)} ETH</span>
				</header>
				<footer class="card-footer"></footer>
			</div>
		{/each}
	</div>
</div>
