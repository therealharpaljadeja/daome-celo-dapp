import Web3 from "web3";
import Creator from "../abi/Creator.json";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export const getNFTCollectionAddress = async (creatorAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);
	let result = await creatorContract.methods.nftCollectionAddress().call();
	return result;
};

export const updateCreator = async (connector, creatorAddress, creatorObj) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);

	let {
		name,
		bio,
		username,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol,
	} = creatorObj;

	let txData = await creatorContract.methods
		.updateCreator(
			username,
			name,
			bio,
			profilePicUrl,
			nftCollectionName,
			nftCollectionSymbol
		)
		.encodeABI();

	await connector.sendTransaction({
		from: connector.accounts[0],
		to: creatorAddress,
		data: txData.toString(),
	});
};
