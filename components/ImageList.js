import tw from "twrnc";
import { FlatList, Image, View, useWindowDimensions } from "react-native";
export default function ImageList() {
	const window = useWindowDimensions();
	let images = [
		"https://bit.ly/dan-abramov",
		"https://bit.ly/kent-c-dodds",
		"https://bit.ly/ryan-florence",
		"https://bit.ly/prosper-baba",
		"https://bit.ly/code-beast",
		"https://bit.ly/sage-adebayo",
	];
	return (
		<>
			<FlatList
				numColumns={3}
				data={images}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					return (
						<Image
							style={{
								width: window.width / 3,
								aspectRatio: 1,
							}}
							source={{ uri: item }}
						/>
					);
				}}
			/>

			{/* <View style={{}}>
				<View
					style={{
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
