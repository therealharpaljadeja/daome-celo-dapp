import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

export default function App() {
	const connector = useWalletConnect();
	const [account, setAccount] = useState(null);
	const connectWallet = React.useCallback(() => {
		if (connector.connected) {
			setAccount(connector.accounts[0]);
		} else {
			return connector.connect();
		}
	}, [connector]);

	return (
		<View style={styles.container}>
			{account ? (
				<Text>{account}</Text>
			) : (
				<Button
					onPress={() => connectWallet()}
					title='Connect Wallet'
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
