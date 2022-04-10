import tw from "twrnc";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { getCreatorObjFromAddress } from "../utils/Creators";
import { CreatorContext } from "../context/CreatorContext";

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	avatar: tw`w-10 h-10 rounded-full mr-2`,
	image: tw`w-100 h-100`,
	button: tw`bg-purple-500 rounded-md px-6 py-3 my-2 mx-2 flex-1`,
	buttonText: tw`text-white text-center`,
	borderBottom: tw`border-b-2 border-gray-200`,
});

export default function Post({ navigation, route }) {
	let {
		creatorAddress,
		name,
		description,
		image,
		collectionAddress,
		tokenId,
	} = route.params.item;
	const [creatorObj, setCreatorObj] = useState(null);
	const [loadingCreator, setLoadingCreator] = useState(false);
	const { approveNFTToMarketplace, approvingNFT, isNFTApproved } =
		useContext(CreatorContext);
	const [isApproved, setIsApproved] = useState(false);

	useEffect(async () => {
		if (route.params.item) {
			setLoadingCreator(true);
			let creatorObj = await getCreatorObjFromAddress(creatorAddress);
			setCreatorObj(creatorObj);
			setLoadingCreator(false);
		}
	}, [route.params.item]);

	useEffect(async () => {
		let isApproved = await isNFTApproved(collectionAddress, tokenId);
		setIsApproved(isApproved);
	}, []);

	const _handlePressButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync(
			`https://alfajores-blockscout.celo-testnet.org/token/${collectionAddress}/instance/${tokenId}/token-transfers`
		);
	};

	return (
		<>
			{creatorObj ? (
				<View>
					<View
						style={tw.style(
							styles.rowFlex,
							"bg-white px-4 py-2 border-t-2 items-center",
							styles.borderBottom
						)}>
						<Image
							style={styles.avatar}
							source={{ uri: "https://bit.ly/dan-abramov" }}
						/>
						<Text>{creatorObj.username}</Text>
					</View>
					<Image
						style={tw.style(styles.image, "border-b-2")}
						source={{
							uri: image,
						}}
					/>
					<View
						style={tw.style(
							`px-4 py-2 bg-white border-t-2`,
							styles.borderBottom
						)}>
						<Text>{name}</Text>
						<Text>{description}</Text>
					</View>
					<View style={tw`justify-center px-2 bg-white flex-row `}>
						{approvingNFT ? (
							<ActivityIndicator
								animating={true}
								size='small'
								style={tw`py-4`}
								color='#a855f7'
							/>
						) : (
							<>
								{isApproved ? (
									<TouchableOpacity
										onPress={() =>
											approveNFTToMarketplace(
												collectionAddress,
												tokenId
											)
										}
										style={styles.button}>
										<Text style={styles.buttonText}>
											Sell
										</Text>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										onPress={() =>
											approveNFTToMarketplace(
												collectionAddress,
												tokenId
											)
										}
										style={styles.button}>
										<Text style={styles.buttonText}>
											Approve
										</Text>
									</TouchableOpacity>
								)}
							</>
						)}
						<TouchableOpacity
							onPress={_handlePressButtonAsync}
							style={styles.button}>
							<Text style={styles.buttonText}>
								View on Explorer
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<ActivityIndicator
					animating={true}
					size='small'
					style={tw`py-4`}
					color='#a855f7'
				/>
			)}
		</>
	);
}
