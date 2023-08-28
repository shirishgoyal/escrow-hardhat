import { ethers, parseEther, parseUnits } from 'ethers';
import { writable, get } from 'svelte/store';

import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

export const walletConnected = writable(false);
export const provider = writable(null);
export const signer = writable(null);
export const pendingEscrows = writable([]);
export const approvedEscrows = writable([]);

export async function createEscrow(s, a, b, v) {
    console.log(`creating escrow with ${s} ${a} ${b} ${v}`);

    const value = parseUnits(v.toString(), "ether");

    const factory = new ethers.ContractFactory(
        Escrow.abi,
        Escrow.bytecode,
        s
    );

    const contract = await factory.deploy(a, b, { value });

    await contract.waitForDeployment();

    const contractAddr = await contract.getAddress();
    console.log(`getting data from contract with ${contractAddr}`);

    const escrow = {
        address: contractAddr,
        depositor: await contract.depositor(),
        arbiter: a,
        beneficiary: b,
        value: value.toString()
    };

    console.log(escrow);

    pendingEscrows.update(contents => [...contents, escrow]);

    console.log(get(pendingEscrows));
}

export async function approveEscrow(addr, sig) {
    console.log(`approving escrow with ${addr}`);

    const contract = new ethers.Contract(addr, Escrow.abi, sig);

    const escrow = {
        address: addr,
        depositor: await contract.depositor(),
        arbiter: await contract.arbiter(),
        beneficiary: await contract.beneficiary(),
        value: await get(provider).getBalance(contract.target)
    };

    console.log(`getting data from contract with ${addr}`);
    console.log(escrow);

    const toApprove = await contract.isApproved();

    if (!toApprove) {
        const txn = await contract.approve();
        await txn.wait();

        approvedEscrows.update(contents => [...contents, escrow]);

    } else {
        // remove from pendingEscrows

        // add to approvedEscrows
        approvedEscrows.update(contents => [...contents, escrow]);
    }
}
