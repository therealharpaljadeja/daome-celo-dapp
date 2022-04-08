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
import FeedScreen from "./screens/Feed";
import ProfileScreen from "./screens/Profile";
import SettingsScreen from "./screens/Settings";

const BottomTabs = createBottomTabNavigator();

export default function App() {
	const { account } = useContext(AccountContext);
	const { userRegistered, checkingIfUserRegistered } =
		useContext(UserContext);
	const { creator } = useContext(CreatorsContext);

	return (
		<>
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
												component={FeedScreen}
											/>
											<BottomTabs.Screen
												name='Profile'
												component={ProfileScreen}
											/>
											<BottomTabs.Screen
												name='Settings'
												component={SettingsScreen}
											/>
										</BottomTabs.Navigator>
									</NavigationContainer>
								)}
							</>
						</>
					)}
				</>
			) : (
				<SafeAreaView style={tw`flex-1 justify-center items-center`}>
					<ConnectWallet />
				</SafeAreaView>
			)}
		</>
	);
}
