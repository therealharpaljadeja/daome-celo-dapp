import React, { useEffect, useState } from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Linking } from "react-native";

export const AccountContext = React.createContext(null);

export default function AccountContextProvider({ children }) {
	const connector = useWalletConnect();
	const [account, setAccount] = useState(null);

	return (
		<AccountContext.Provider
			value={{
				connector,
				account,
				setAccount,
			}}>
			{children}
		</AccountContext.Provider>
	);
}
