import { Text } from "react-native";
import React, { useContext } from "react";
import AccountContextProvider, {
	AccountContext,
} from "./context/AccountContext";
import ConnectWalletScreen from "./screens/ConnectWallet";

export default function App() {
	return (
		<AccountContextProvider>
			<ConnectWalletScreen />
		</AccountContextProvider>
	);
}
