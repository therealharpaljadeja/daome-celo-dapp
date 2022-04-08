import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";
import { isUserRegistered } from "../utils/Creators";

export const UserContext = React.createContext(null);

export default function UserContextProvider({ children }) {
	const { account, connector, setAccount } = useContext(AccountContext);
	const [userRegistered, setUserRegistered] = useState(null);

	useEffect(async () => {
		if (connector.connected) {
			setAccount(connector.accounts[0]);
		} else {
			setAccount(null);
		}
	}, [connector]);

	useEffect(async () => {
		if (account) {
			let result = await checkIfUserRegistered(account);
			setUserRegistered(result);
		}
	}, [account]);

	const checkIfUserRegistered = async () => {
		let result = await isUserRegistered(account);
		return result;
	};

	return (
		<UserContext.Provider
			value={{
				checkIfUserRegistered,
				userRegistered,
			}}>
			{children}
		</UserContext.Provider>
	);
}
