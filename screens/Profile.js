import {
	View,
	Button,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { useContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ImageList from "../components/ImageList";
import { CreatorsContext } from "../context/CreatorsContext";
import MintNFTModal from "../components/MintNFTModal";
import { AccountContext } from "../context/AccountContext";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	verticalItems: tw`items-center flex-1`,
	textStyle: tw`text-center text-base`,
	touchableOpacity: tw`bg-purple-500 rounded-md px-4 py-2 self-center shadow-md`,
	imageStyles: tw`rounded-full w-20 h-20 self-center`,
});

export default function ProfileScreen({ navigation }) {
	const { creator } = useContext(CreatorsContext);
	const [isMintModalOpen, setIsMintModalOpen] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<MintNFTModal
				isMintModalOpen={isMintModalOpen}
				setIsMintModalOpen={setIsMintModalOpen}
			/>
			<View
				style={{
					justifyContent: "center",
					position: "relative",
					marginBottom: 10,
				}}>
				<Image
					style={{
						position: "absolute",
						width: "100%",
						height: 100,
						right: 0,
						top: 0,
					}}
					source={{
						uri: "https://pbs.twimg.com/media/D-jnKUPU4AE3hVR.jpg",
					}}
				/>
				<Image
					style={tw.style(styles.imageStyles, "mt-15")}
					source={{ uri: "https://bit.ly/dan-abramov" }}
				/>
				<Text style={tw.style(styles.textStyle, "text-lg mt-2")}>
					{creator.name}
				</Text>
				<Text style={tw.style(styles.textStyle, "mt-1")}>
					{creator.bio}
				</Text>
				<View style={tw.style(styles.rowFlex, "mt-3")}>
					<View style={tw.style(styles.verticalItems)}>
						<Text style={tw.style(styles.textStyle)}>0</Text>
						<Text style={tw.style(styles.textStyle)}>
							NFTs Owned
						</Text>
					</View>
					<View style={tw.style(styles.verticalItems)}>
						<Text style={tw.style(styles.textStyle)}>0</Text>
						<Text style={tw.style(styles.textStyle)}>
							Royalty Earned
						</Text>
					</View>
				</View>
				<View
					style={{ flexDirection: "row", justifyContent: "center" }}>
					<TouchableOpacity
						onPress={() => setIsMintModalOpen(true)}
						style={tw.style(styles.touchableOpacity, "mt-3 mx-2")}>
						<Text style={tw.style(styles.textStyle, "text-white")}>
							Mint NFT
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw.style(styles.touchableOpacity, "mt-3")}>
						<Text style={tw.style(styles.textStyle, "text-white")}>
							Withdraw Royalty
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={tw`flex-1`}>
				<Tab.Navigator
					style={tw`bg-red-500`}
					screenOptions={{
						tabBarActiveTintColor: "#fff",
						tabBarInactiveTintColor: "#a855f7",
						tabBarContentContainerStyle: tw`bg-transparent p-2`,
						tabBarIndicatorContainerStyle: tw`bg-purple-200 `,
						tabBarIndicatorStyle: tw`bg-purple-500 h-12 top-2 rounded-md relative`,
					}}>
					<Tab.Screen name='Owned' component={ImageList} />
					<Tab.Screen name='Listed' component={ImageList} />
				</Tab.Navigator>
			</View>
		</View>
	);
}
