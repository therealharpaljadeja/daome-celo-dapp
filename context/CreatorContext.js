import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { getCreatorAddressByAddress } from "../utils/Creators";
import {
	approveToMarketplace,
	isApprovedToMarketplace,
	mintNFT,
	tokenOwnedByUser,
} from "../utils/NFT";
import { CreatorsContext } from "./CreatorsContext";

export const CreatorContext = React.createContext(null);

export default function CreatorContextProvider({ children }) {
	const { account, connector } = useContext(AccountContext);
	const { creatorAddress } = useContext(CreatorsContext);
	const [loadingNFT, setLoadingNFT] = useState(false);
	const [currentUserNFTs, setCurrentUserNFTs] = useState([]);
	const [approvingNFT, setApprovingNFT] = useState(false);

	async function mintNFTUsingContext(tokenURI, royaltyPercentage) {
		let creatorAddress = await getCreatorAddressByAddress(account);
		await mintNFT(connector, creatorAddress, tokenURI, royaltyPercentage);
		return;
	}

	async function getNFTsOwnerByUserUsingSigner() {
		setLoadingNFT(true);
		let result = await tokenOwnedByUser(account, creatorAddress);
		setCurrentUserNFTs(result);
		setLoadingNFT(false);
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

	return (
		<CreatorContext.Provider
			value={{
				mintNFT: mintNFTUsingContext,
				loadingNFT,
				currentUserNFTs,
				getNFTsOwnerByUserUsingSigner,
				approveNFTToMarketplace,
				isNFTApproved,
			}}>
			{children}
		</CreatorContext.Provider>
	);
}
