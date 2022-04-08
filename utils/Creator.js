import Web3 from "web3";
import Creator from "../abi/Creator.json";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export const getNFTCollectionAddress = async (creatorAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, creatorAddress);
	let result = await creatorContract.methods.nftCollectionAddress().call();
	return result;
};
