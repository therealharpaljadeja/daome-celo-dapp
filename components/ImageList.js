import tw from "twrnc";
import { useContext } from "react";
import {
	FlatList,
	Image,
	View,
	useWindowDimensions,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { CreatorContext } from "../context/CreatorContext";
export default function ImageList({ navigation }) {
	const { loadingNFT, currentUserNFTs } = useContext(CreatorContext);
	const window = useWindowDimensions();
	return (
		<>
			{loadingNFT ? (
				<ActivityIndicator
					animating={true}
					size='small'
					style={tw`py-4`}
					color='#a855f7'
				/>
			) : (
				<FlatList
					numColumns={3}
					data={currentUserNFTs}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("Post", {
										item,
									})
								}>
								<Image
									style={{
										width: window.width / 3,
										aspectRatio: 1,
									}}
									source={{ uri: item.image }}
								/>
							</TouchableOpacity>
						);
					}}
				/>
			)}

			{/* <View style={{}}>
				<View
					style={{
			</View>
			<View style={{}}>
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1, aspectRatio: 1 }}
							resizeMode='cover'
							source={require()}
						/>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
				</View>
			</View>
			<View style={{}}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "red",
					}}>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
					</View>
				</View>
			</View> */}
		</>
	);
}
