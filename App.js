import { ActivityIndicator, Text } from "react-native";
import React, { useContext } from "react";
import ConnectWallet from "./screens/ConnectWallet";
import { AccountContext } from "./context/AccountContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./context/UserContext";
import tw from "twrnc";
import SignUpModal from "./components/SignUpModal";

export default function App() {
	const { account } = useContext(AccountContext);
	const { userRegistered, checkingIfUserRegistered } =
		useContext(UserContext);

	return (
		<SafeAreaView style={tw`flex-1 justify-center items-center`}>
			{account ? (
				<>
					{checkingIfUserRegistered ? (
						<ActivityIndicator
							animating={true}
							size='large'
							color='#a855f7'
						/>
					) : (
						<>{!userRegistered && <SignUpModal />}</>
					)}
				</>
			) : (
				<ConnectWallet />
			)}
		</SafeAreaView>
	);
}
