import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { getCreatorAddressByAddress } from "../utils/Creators";
import { mintNFT } from "../utils/NFT";

export const CreatorContext = React.createContext(null);

export default function CreatorContextProvider({ children }) {
	const { account, connector } = useContext(AccountContext);

	async function mintNFTUsingContext(tokenURI, royaltyPercentage) {
		let creatorAddress = await getCreatorAddressByAddress(account);
		await mintNFT(connector, creatorAddress, tokenURI, royaltyPercentage);
	}

	return (
		<CreatorContext.Provider value={{ mintNFT: mintNFTUsingContext }}>
			{children}
		</CreatorContext.Provider>
	);
}
