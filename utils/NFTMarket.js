import Web3 from "web3";
import { MARKETPLACE_CONTRACT_ADDRESS, CREATORS_CONTRACT_ADDRESS } from "@env";
import NFTMarket from "../abi/NFTMarket.json";
import NFT from "../abi/NFT.json";
import Creator from "../abi/Creator.json";
import Creators from "../abi/Creators.json";
import axios from "axios";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
let nftMarketContract = new web3.eth.Contract(
	NFTMarket.abi,
	MARKETPLACE_CONTRACT_ADDRESS
);

export const createMarketItem = async (
	connector,
	collectionAddress,
	tokenId,
	price
) => {
	let txObject = nftMarketContract.methods
		.createMarketItem(collectionAddress, tokenId, price)
		.encodeABI();

	await connector.sendTransaction({
		from: connector.accounts[0],
		to: MARKETPLACE_CONTRACT_ADDRESS,
		data: txObject.toString(),
		value: web3.utils.numberToHex(web3.utils.toWei("0.025", "ether")),
	});
};

export const fetchMarketItems = async () => {
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods.fetchMarketItems().call();
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		let nft = {};

		let nftContract = new web3.eth.Contract(NFT.abi, result[i].nftContract);

		let tokenURI = await nftContract.methods
			.tokenURI(result[i].tokenId.toString())
			.call();
		let owner = await nftContract.methods
			.ownerOf(result[i].tokenId.toString())
			.call();
		let response = await axios.get(tokenURI);
		const { name, description, image } = response.data;

		const creatorsContract = new web3.eth.Contract(
			Creators.abi,
			CREATORS_CONTRACT_ADDRESS
		);

		let creatorAddress = await creatorsContract.methods
			.getCreatorAddressByAddress(result[i].seller)
			.call();

		let creatorContract = new web3.eth.Contract(
			Creator.abi,
			creatorAddress
		);

		let sellerName = await creatorContract.methods.name().call();
		let sellerProfilePic = await creatorContract.methods
			.profilePicUrl()
			.call();

		nft.collectionAddress = result[i].nftContract;
		nft.seller = result[i].seller;
		nft.itemId = result[i].itemId;
		nft.price = result[i].price;
		nft.tokenId = result[i].tokenId.toString();
		nft.owner = owner;
		nft.name = name;
		nft.description = description;
		nft.image = image;
		nft.creator = {};
		nft.creator.name = sellerName;
		nft.creator.profilePicUrl = sellerProfilePic;
		nfts.push(nft);
	}

	return nfts;
};

export const fetchMyNFTs = async (account) => {
	const currentAddress = account;
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods
		.fetchMyNFTs(currentAddress)
		.call();
	console.log(result, "result");
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		let nftContract = new web3.eth.Contract(NFT.abi, result[i].nftContract);
		let owner = await nftContract.methods
			.ownerOf(result[i].tokenId.toString())
			.call();
		if (owner === currentAddress) {
			let nft = {};

			let tokenURI = await nftContract.methods
				.tokenURI(result[i].tokenId.toString())
				.call();
			let response = await axios.get(tokenURI);
			const { name, description, image } = response.data;

			const creatorsContract = new web3.eth.Contract(
				Creators.abi,
				CREATORS_CONTRACT_ADDRESS
			);
			let creatorAddress =
				await creatorsContract.methods.getCreatorAddressByAddress(
					result[i].seller
				);
			let creatorContract = new web3.eth.Contract(
				Creator.abi,
				creatorAddress
			);

			let sellerName = await creatorContract.methods.name().call();

			let sellerProfilePic = await creatorContract.methods
				.profilePicUrl()
				.call();

			nft.collectionAddress = result[i].nftContract;
			nft.seller = result[i].seller;
			nft.price = result[i].price;
			nft.tokenId = result[i].tokenId.toString();
			nft.owner = owner;
			nft.name = name;
			nft.description = description;
			nft.image = imageUrl;
			nft.creatorAddress = creatorAddress;

			nft.creator = {};
			nft.creator.name = sellerName;
			nft.creator.profilePicUrl = sellerProfilePic;
			console.log(name, description);
			nfts.push(nft);
		}
	}

	return nfts;
};

export const fetchItemsCreated = async (account) => {
	const currentAddress = account;
	let nftMarketContract = new web3.eth.Contract(
		NFTMarket.abi,
		MARKETPLACE_CONTRACT_ADDRESS
	);
	let result = await nftMarketContract.methods
		.fetchItemsCreated(currentAddress)
		.call();
	let nfts = [];
	for (let i = 0; i < result.length; i++) {
		if (result[i].sold !== true) {
			let nft = {};

			let nftContract = new web3.eth.Contract(
				NFT.abi,
				result[i].nftContract
			);

			let tokenURI = await nftContract.methods
				.tokenURI(result[i].tokenId.toString())
				.call();
			let owner = await nftContract.methods
				.ownerOf(result[i].tokenId.toString())
				.call();
			let response = await axios.get(tokenURI);
			const { name, description, image } = response.data;
			const creatorsContract = new web3.eth.Contract(
				Creators.abi,
				CREATORS_CONTRACT_ADDRESS
			);
			let creatorAddress = await creatorsContract.methods
				.getCreatorAddressByAddress(result[i].seller)
				.call();
			let creatorContract = new web3.eth.Contract(
				Creator.abi,
				creatorAddress
			);
			let sellerName = await creatorContract.methods.name().call();
			let sellerProfilePic = await creatorContract.methods
				.profilePicUrl()
				.call();

			nft.collectionAddress = result[i].nftContract;
			nft.seller = result[i].seller;
			nft.itemId = result[i].itemId;
			nft.price = result[i].price;
			nft.tokenId = result[i].tokenId.toString();
			nft.owner = owner;
			nft.name = name;
			nft.description = description;
			nft.image = image;
			nft.creatorAddress = creatorAddress;
			nft.creator = {};
			nft.creator.name = sellerName;
			nft.creator.profilePicUrl = sellerProfilePic;
			nfts.push(nft);
		}
	}

	return nfts;
};
