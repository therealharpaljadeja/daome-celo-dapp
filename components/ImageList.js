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
export default function ImageList({ navigation, loadingNFT, currentUserNFTs }) {
	const window = useWindowDimensions();
	return (
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
	);
}
