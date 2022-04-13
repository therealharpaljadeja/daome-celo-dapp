import React, { useState } from "react";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@env";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

console.log(MARKETPLACE_CONTRACT_ADDRESS);
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
