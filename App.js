import { Text } from "react-native";
import React, { useContext } from "react";
import ConnectWallet from "./screens/ConnectWallet";
import { AccountContext } from "./context/AccountContext";

export default function App() {
	return <ConnectWallet />;
}
