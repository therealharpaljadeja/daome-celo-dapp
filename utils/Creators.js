import Creators from "../abi/Creators.json";
import Creator from "../abi/Creator.json";
import { CREATORS_CONTRACT_ADDRESS } from "@env";
import Web3 from "web3";
import axios from "axios";

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

export const registerUser = async (connector, creatorObj) => {
	let {
		name,
		bio,
		username,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol,
	} = creatorObj;

	let txData = await creatorsContract.methods
		.registerUser(
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
		to: CREATORS_CONTRACT_ADDRESS,
		data: txData,
	});
};

export const getCreatorAddressByAddress = async (account) => {
	console.log(account);
	let result = await creatorsContract.methods
		.getCreatorAddressByAddress(account)
		.call();
	return result;
};
export const getCreatorObjFromAddress = async (contractAddress) => {
	const creatorContract = new web3.eth.Contract(Creator.abi, contractAddress);

	let username = await creatorContract.methods.username().call();
	let name = await creatorContract.methods.name().call();
	let bio = await creatorContract.methods.bio().call();

	let profilePicUrl = await creatorContract.methods.profilePicUrl().call();
	let response = await axios.get(profilePicUrl);
	let { image } = response.data;

	let nftCollectionName = await creatorContract.methods
		.nftCollectionName()
		.call();
	let nftCollectionSymbol = await creatorContract.methods
		.nftCollectionSymbol()
		.call();
	let nftCollectionAddress = await creatorContract.methods
		.nftCollectionAddress()
		.call();

	console.log(nftCollectionAddress);

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
		profilePicUrl: image,
		royaltyEarned,
	};
};
