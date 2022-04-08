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
