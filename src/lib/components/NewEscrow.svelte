<script>
	import { get } from 'svelte/store';
	import { signer, createEscrow } from '$lib/store';

	let arbiter = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
	let beneficiary = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
	let amount = 0.001;

	$: disableEscrow =
		arbiter == null || arbiter == '' || beneficiary == null || beneficiary == '' || amount <= 0;

	async function handleSubmit() {
		console.log(`Submitted ${arbiter} ${beneficiary} ${amount}`);
		await createEscrow(get(signer), arbiter, beneficiary, amount);
	}
</script>

<div class="escrow-new flex flex-col gap-6">
	<h1 class="h3">Create new escrow</h1>

	<label class="label">
		<span class="h5">Arbiter Address</span>
		<input
			id="arbiter"
			class="input"
			type="text"
			placeholder="Enter wallet address of Arbiter"
			bind:value={arbiter}
		/>
	</label>

	<label class="label">
		<span class="h5">Beneficiary Address</span>
		<input
			id="beneficiary"
			class="input"
			type="text"
			placeholder="Enter wallet address of Beneficiary"
			bind:value={beneficiary}
		/>
	</label>

	<label class="label">
		<span class="h5">Escrow Amount (in Ether)</span>
		<input
			id="amount"
			class="input"
			type="number"
			placeholder="Enter amount to escrow in ethers"
			bind:value={amount}
			min="0"
			max="100"
		/>
	</label>

	<button
		type="submit"
		id="deploy"
		class="btn variant-filled-primary mt-2"
		on:click={handleSubmit}
		disabled={disableEscrow}>Submit</button
	>
</div>
