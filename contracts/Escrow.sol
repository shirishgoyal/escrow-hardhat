// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;

	bool public isApproved;

	constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event EscrowCreated(address depositor, address arbiter, address beneficiary, uint amount);
	event Approved(address depositor, address arbiter, address beneficiary, uint amount);

	function approve() external {
		require(msg.sender == arbiter, 'Not Arbiter');
		require(isApproved == false, 'Already approved');

		uint balance = address(this).balance;

		(bool sent, ) = payable(beneficiary).call{value: balance}('');
		require(sent, 'Failed to send ether');

		emit Approved(depositor, arbiter, beneficiary, balance);
		isApproved = true;
	}
}
