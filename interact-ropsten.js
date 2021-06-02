const { ethers } = require('ethers');
const USElection = require('./build/USelection.json')

const run = async function() {
	const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173");
    const wallet = new ethers.Wallet("cb44501c75a77824a48a5b0a273ab4898dec507a5a901ca1d0dbe1f1cc4049d5", provider);

	const electionContract = new ethers.Contract("0x261c58dEA18fE5658BC1e6F66Bd72DcC9725DCaf", USElection.abi, wallet)

	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	console.log("State Result Submission Transaction:", transactionOhio.hash);

	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successfull")
		return;
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	const currentLeader = await electionContract.currentLeader();
	console.log("Current leader", currentLeader);
}

run();