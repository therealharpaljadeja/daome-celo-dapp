import { useContext } from "react";
import tw from "twrnc";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AccountContext } from "../context/AccountContext";
import { CreatorContext } from "../context/CreatorContext";

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	avatar: tw`w-10 h-10 rounded-full mr-2`,
	image: tw`w-100 h-100`,
	button: tw`bg-purple-500 rounded-md px-6 py-3 my-2 mx-2 flex-1`,
	buttonText: tw`text-white text-center`,
	borderBottom: tw`border-b-2 border-gray-200`,
});

export default function Post({ nft }) {
	const window = useWindowDimensions();
	const { account } = useContext(AccountContext);
	const { buyNFT } = useContext(CreatorContext);
	const {
		name,
		owner,
		creator,
		seller,
		image,
		description,
		collectionAddress,
		tokenId,
		price,
	} = nft;

	const _handlePressButtonAsync = async () => {
		let url = `https://alfajores-blockscout.celo-testnet.org/token/${collectionAddress}/instance/${tokenId}/token-transfers`;
		console.log(url);
		let result = await WebBrowser.openBrowserAsync(url);
	};

	async function createBuyOrder() {
		await buyNFT(collectionAddress, tokenId, price);
	}

	return (
		<View>
			<View
				style={tw.style(
					styles.rowFlex,
					"bg-white px-4 py-2 border-t-2 items-center",
					styles.borderBottom
				)}>
				<Image
					style={styles.avatar}
					source={{
						uri: creator.profilePicUrl
							? creator.profilePicUrl
							: "https://bit.ly/dan-abramov",
					}}
				/>
				<Text>{creator.name}</Text>
			</View>
			<Image
				style={tw.style(styles.image, { width: window.width })}
				source={{
					uri: image,
				}}
			/>
			<View
				style={tw.style(
					`px-4 py-2 bg-white border-t-2 flex-row justify-between items-center`,
					styles.borderBottom
				)}>
				<View>
					<Text>{name}</Text>
					<Text>{description}</Text>
				</View>
				<View>
					<Text style={tw`text-lg `}>{price} $CELO</Text>
				</View>
			</View>
			<View style={tw`justify-center px-2 bg-white flex-row `}>
				{account == seller.toLowerCase() ? null : (
					<TouchableOpacity
						onPress={createBuyOrder}
						style={styles.button}>
						<Text style={styles.buttonText}>Buy</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={_handlePressButtonAsync}
					style={styles.button}>
					<Text style={styles.buttonText}>View on Explorer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
