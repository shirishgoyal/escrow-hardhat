<script>
	import { ethers } from 'ethers';

	import { page } from '$app/stores';
	import { AppBar, popup } from '@skeletonlabs/skeleton';

	import { walletConnected, provider, signer } from '$lib/store';

	async function connectWallet() {
		console.log(`Connecting wallet...`);

		if (window.ethereum == null) {
			console.log(`Ethereum Wallet not installed, use defaults`);
			const defaultProvider = ethers.getDefaultProvider();
			provider.set(defaultProvider);
			const defaultSigner = await provider.getSigner();
			signer.set(defaultSigner);
			walletConnected.set(true);
		} else {
			//connect to MetaMask
			console.log(`Ethereum Wallet found`);
			// console.log(window.ethereum);

			const browserProvider = new ethers.BrowserProvider(window.ethereum);

			provider.set(browserProvider);
			// console.log(browserProvider);
			const browserSigner = await browserProvider.getSigner();
			signer.set(browserSigner);
			// console.log(browserSigner);
			walletConnected.set(true);
		}
	}
</script>

<AppBar padding="px-4 py-2">
	<svelte:fragment slot="lead">
		<strong class="text-xl uppercase">Escrow</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $walletConnected}
			<button class="btn variant-ghost-primary">
				Wallet connected to {$signer.address.slice(0, 8)}...
			</button>
		{:else}
			<button class="btn variant-filled-primary" on:click={connectWallet}> Connect Wallet </button>
		{/if}
	</svelte:fragment>
</AppBar>
