import React, { useEffect, useState, useContext } from "react";
import {
	registerUser as registerUserUtil,
	getCreatorAddressBySender,
	getCreatorObjFromAddress,
} from "../utils/Creators";
import { UserContext } from "./UserContext";

export const CreatorsContext = React.createContext(null);

export default function CreatorContextProvider({ children }) {
	const [creator, setCreator] = useState(null);
	const { userRegistered } = useContext(UserContext);

	useEffect(async () => {
		if (userRegistered) {
			let creatorAddress = await getCreatorAddressBySender();
			setCreator(await getCreatorObjFromAddress(creatorAddress));
		}
	}, [userRegistered]);

	const registerUser = async (creatorObj) => {
		await registerUserUtil(creatorObj);
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
