import React, { useEffect, useState, useContext } from "react";
import {
	registerUser as registerUserUtil,
	getCreatorAddressByAddress,
	getCreatorObjFromAddress,
} from "../utils/Creators";
import { AccountContext } from "./AccountContext";
import { UserContext } from "./UserContext";

export const CreatorsContext = React.createContext(null);

export default function CreatorContextProvider({ children }) {
	const [creator, setCreator] = useState(null);
	const { connector, account } = useContext(AccountContext);
	const { userRegistered } = useContext(UserContext);

	useEffect(async () => {
		if (userRegistered) {
			let creatorAddress = await getCreatorAddressByAddress(account);
			setCreator(await getCreatorObjFromAddress(creatorAddress));
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
			}}>
			{children}
		</CreatorsContext.Provider>
	);
}
