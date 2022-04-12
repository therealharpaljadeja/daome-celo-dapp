import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { getCreatorAddressByAddress } from "../utils/Creators";
import {
	approveToMarketplace,
	isApprovedToMarketplace,
	mintNFT,
	tokenOwnedByUser,
	withdrawRoyalty,
} from "../utils/NFT";
import { CreatorsContext } from "./CreatorsContext";
import {
	createMarketItem,
	fetchItemsCreated,
	fetchMyNFTs,
} from "../utils/NFTMarket";
import { updateCreator } from "../utils/Creator";

export const CreatorContext = React.createContext(null);

export default function CreatorContextProvider({ children }) {
	const { account, connector } = useContext(AccountContext);
	const { creatorAddress } = useContext(CreatorsContext);
	const [loadingOwnedNFT, setLoadingOwnedNFT] = useState(false);
	const [loadingListedNFT, setLoadingListedNFT] = useState(false);
	const [currentUserNFTs, setCurrentUserNFTs] = useState([]);
	const [listedNFTs, setListedNFTs] = useState([]);
	const [approvingNFT, setApprovingNFT] = useState(false);

	async function mintNFTUsingContext(tokenURI, royaltyPercentage) {
		await mintNFT(connector, creatorAddress, tokenURI, royaltyPercentage);
		return;
	}

	async function getNFTsOwnerByUserUsingSigner() {
		setLoadingOwnedNFT(true);
		let result = await tokenOwnedByUser(account, creatorAddress);
		setCurrentUserNFTs(result);
		setLoadingOwnedNFT(false);
	}

	async function getNFTsListedByUserUsingSigner() {
		setLoadingListedNFT(true);
		let result = await fetchItemsCreated(account);
		setListedNFTs(result);
		setLoadingListedNFT(false);
	}

	async function approveNFTToMarketplace(collectionAddress, tokenId) {
		setApprovingNFT(true);
		let result = await approveToMarketplace(
			connector,
			collectionAddress,
			tokenId
		);
		console.log(result);
		setApprovingNFT(false);
	}

	async function isNFTApproved(collectionAddress, tokenId) {
		let result = await isApprovedToMarketplace(collectionAddress, tokenId);
		return result;
	}

	async function listItemForSale(collectionAddress, tokenId, price) {
		await createMarketItem(connector, collectionAddress, tokenId, price);
	}

	async function withdraw(collectionAddress) {
		await withdrawRoyalty(connector, collectionAddress);
	}

	async function updateCreatorObj(creatorObj) {
		await updateCreator(connector, creatorAddress, creatorObj);
	}

	return (
		<CreatorContext.Provider
			value={{
				mintNFT: mintNFTUsingContext,
				currentUserNFTs,
				listedNFTs,
				getNFTsOwnerByUserUsingSigner,
				getNFTsListedByUserUsingSigner,
				approveNFTToMarketplace,
				isNFTApproved,
				listItemForSale,
				loadingListedNFT,
				loadingOwnedNFT,
				withdraw,
				updateCreatorObj,
			}}>
			{children}
		</CreatorContext.Provider>
	);
}
