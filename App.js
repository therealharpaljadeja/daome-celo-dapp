import { ActivityIndicator, Text } from "react-native";
import React, { useContext } from "react";
import ConnectWallet from "./screens/ConnectWallet";
import { AccountContext } from "./context/AccountContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./context/UserContext";
import tw from "twrnc";
import SignUpModal from "./components/SignUpModal";
import { CreatorsContext } from "./context/CreatorsContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import FeedScreen from "./screens/Feed";
import ProfileScreen from "./screens/Profile";
import SettingsScreen from "./screens/Settings";
import Post from "./screens/Post";
import ProfilePostNavigator from "./screens/ProfilePostNavigator";

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	const { account } = useContext(AccountContext);
	const { userRegistered, checkingIfUserRegistered } =
		useContext(UserContext);
	const { creator, loadingCreator } = useContext(CreatorsContext);

	return (
		<>
			{account ? (
				<>
					{checkingIfUserRegistered || loadingCreator ? (
						<SafeAreaView
							style={tw`flex-1 justify-center items-center`}>
							<ActivityIndicator
								animating={true}
								size='large'
								color='#a855f7'
							/>
						</SafeAreaView>
					) : (
						<>
							<>{!userRegistered && <SignUpModal />}</>
							<>
								{creator && (
									<NavigationContainer>
										<BottomTabs.Navigator
											initialRouteName='ProfilePostNavigator'
											screenOptions={({ route }) => ({
												tabBarLabelPosition:
													"beside-icon",
												tabBarIcon: ({
													color,
													size,
												}) => {
													const Icons = {
														ProfilePostNavigator:
															"user",
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
												name='ProfilePostNavigator'
												options={{
													title: "Profile",
													headerShown: false,
												}}
												component={ProfilePostNavigator}
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
