import { TouchableOpacity, Text } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";

export default function ConnectWallet() {
	const { connector } = useContext(AccountContext);

	async function login() {
		connector.connect();
	}
	async function logout() {
		connector.killSession();
	}

	return (
		<SafeAreaView style={tw`flex-1 justify-center items-center`}>
			{connector.connected ? (
				<TouchableOpacity
					style={tw`bg-purple-500 p-4 rounded-md shadow-md`}
					onPress={logout}>
					<Text style={tw`text-white`}>Disconnect Wallet</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={tw`bg-purple-500 p-4 rounded-md shadow-md`}
					onPress={login}>
					<Text style={tw`text-white`}>Connect Wallet</Text>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
}
