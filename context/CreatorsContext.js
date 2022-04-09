import React, { useEffect, useState, useContext } from "react";
import {
	registerUser as registerUserUtil,
	getCreatorAddressByAddress,
	getCreatorObjFromAddress,
} from "../utils/Creators";
import { AccountContext } from "./AccountContext";
import { UserContext } from "./UserContext";

export const CreatorsContext = React.createContext(null);

export default function CreatorsContextProvider({ children }) {
	const [creator, setCreator] = useState(null);
	const [creatorAddress, setCreatorAddress] = useState(null);
	const [loadingCreator, setLoadingCreator] = useState(false);
	const { connector, account } = useContext(AccountContext);
	const { userRegistered } = useContext(UserContext);

	useEffect(async () => {
		if (userRegistered) {
			setLoadingCreator(true);
			let creatorAddress = await getCreatorAddressByAddress(account);
			setCreatorAddress(creatorAddress);
			setCreator(await getCreatorObjFromAddress(creatorAddress));
			setLoadingCreator(false);
		}
	}, [userRegistered]);

	const registerUser = async (creatorObj) => {
		await registerUserUtil(connector, creatorObj);
	};

	return (
		<CreatorsContext.Provider
			value={{
				registerUser,
				creator,
				creatorAddress,
				loadingCreator,
			}}>
			{children}
		</CreatorsContext.Provider>
	);
}
