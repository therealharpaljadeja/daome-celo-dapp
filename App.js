import { ActivityIndicator, Text } from "react-native";
import React, { useContext } from "react";
import ConnectWallet from "./screens/ConnectWallet";
import { AccountContext } from "./context/AccountContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./context/UserContext";
import tw from "twrnc";
import SignUpModal from "./components/SignUpModal";
import { CreatorsContext } from "./context/CreatorsContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";

const BottomTabs = createBottomTabNavigator();

export default function App() {
	const { account } = useContext(AccountContext);
	const { userRegistered, checkingIfUserRegistered } =
		useContext(UserContext);
	const { creator } = useContext(CreatorsContext);

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
						<>
							<>{!userRegistered && <SignUpModal />}</>
							<>
								{creator && (
									<NavigationContainer>
										<BottomTabs.Navigator
											initialRouteName='Profile'
											screenOptions={({ route }) => ({
												tabBarLabelPosition:
													"beside-icon",
												tabBarIcon: ({
													color,
													size,
												}) => {
													const Icons = {
														Profile: "user",
														Settings: "setting",
														Feed: "earth",
													};
													return (
														<Icon
															color={color}
															name={
																Icons[
																	route.name
																]
															}
															size={size}
														/>
													);
												},
												tabBarActiveTintColor:
													"#a855f7",
											})}>
											<BottomTabs.Screen
												name='Feed'
												component={() => {
													return (
														<Text>Feed Screen</Text>
													);
												}}
											/>
											<BottomTabs.Screen
												name='Profile'
												component={() => (
													<Text>Profile Screen</Text>
												)}
											/>
											<BottomTabs.Screen
												name='Settings'
												component={() => (
													<Text>Settings Screen</Text>
												)}
											/>
										</BottomTabs.Navigator>
									</NavigationContainer>
								)}
							</>
						</>
					)}
				</>
			) : (
				<ConnectWallet />
			)}
		</SafeAreaView>
	);
}
