import { TouchableOpacity, Text } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";

export default function ConnectWalletScreen() {
	const { connector, setAccount } = useContext(AccountContext);

	async function login() {
		if (connector.connected) {
			setAccount(connector.account);
		} else {
			connector.connect();
		}
	}

	return (
		<SafeAreaView style={tw`flex-1 justify-center items-center`}>
			<TouchableOpacity
				style={tw`bg-purple-500 p-4 rounded-md shadow-md`}
				onPress={login}>
				<Text style={tw`text-white`}>Connect Wallet</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
