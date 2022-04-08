import Creators from "../abi/Creators.json";
import { CREATORS_CONTRACT_ADDRESS } from "@env";
import Web3 from "web3";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

const creatorsContract = new web3.eth.Contract(
	Creators.abi,
	CREATORS_CONTRACT_ADDRESS
);

export const isUserRegistered = async (account) => {
	let result = await creatorsContract.methods
		.isUserRegistered(account)
		.call();
	return result;
};

export const registerUser = async (creatorObj) => {
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);

	let {
		name,
		bio,
		username,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol,
	} = creatorObj;

	let txObject = await creatorsContract.methods.registerUser(
		username,
		name,
		bio,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol
	);

	console.log(creatorObj);
};

export const getCreatorAddressBySender = async () => {
	const creatorsContract = new web3.eth.Contract(
		Creators.abi,
		CREATORS_CONTRACT_ADDRESS
	);

	let result = await creatorsContract.methods
		.getCreatorAddressBySender()
		.call();
	return result;
};

export const getCreatorObjFromAddress = async (contractAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, contractAddress);

	let username = await creatorContract.methods.username().call();
	let name = await creatorContract.methods.name().call();
	let bio = await creatorContract.methods.bio().call();

	let profilePicUrl = await creatorContract.methods.profilePicUrl().call();
	let nftCollectionName = await creatorContract.methods
		.nftCollectionName()
		.call();
	let nftCollectionSymbol = await creatorContract.methods
		.nftCollectionSymbol()
		.call();
	let nftCollectionAddress = await creatorContract.methods
		.nftCollectionAddress()
		.call();

	let royaltyEarned = web3.utils.fromWei(
		(await web3.eth.getBalance(nftCollectionAddress)).toString()
	);

	return {
		username,
		name,
		bio,
		nftCollectionName,
		nftCollectionSymbol,
		nftCollectionAddress,
		profilePicUrl,
		royaltyEarned,
	};
};
