import tw from "twrnc";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	useWindowDimensions,
	ScrollView,
	RefreshControl,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { getCreatorObjFromAddress } from "../utils/Creators";
import { CreatorContext } from "../context/CreatorContext";
import SellModal from "../components/SellModal";
import { AccountContext } from "../context/AccountContext";

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	avatar: tw`w-10 h-10 rounded-full mr-2`,
	image: tw`w-100 h-100`,
	button: tw`bg-purple-500 rounded-md px-6 py-3 my-2 mx-2 flex-1`,
	buttonText: tw`text-white text-center`,
	borderBottom: tw`border-b-2 border-gray-200`,
});

export default function Post({ navigation, route }) {
	const window = useWindowDimensions();
	let {
		creatorAddress,
		name,
		description,
		image,
		collectionAddress,
		tokenId,
		seller,
	} = route.params.item;
	const [creatorObj, setCreatorObj] = useState(null);
	const [loadingCreator, setLoadingCreator] = useState(false);
	const [isSellNFTModalOpen, setIsSellNFTModalOpen] = useState(false);
	const { account } = useContext(AccountContext);
	const {
		approveNFTToMarketplace,
		approvingNFT,
		isNFTApproved,
		listItemForSale,
	} = useContext(CreatorContext);
	const [isApproved, setIsApproved] = useState(false);
	const [price, setPrice] = useState("");
	const [creatingMarketItem, setCreatingMarketItem] = useState(false);
	const [checkingApproved, setCheckingApproved] = useState(false);
	useEffect(async () => {
		if (route.params.item) {
			setLoadingCreator(true);
			let creatorObj = await getCreatorObjFromAddress(creatorAddress);
			setCreatorObj(creatorObj);
			setLoadingCreator(false);
		}
	}, [route.params.item]);

	async function checkIfNFTApproved() {
		setCheckingApproved(true);
		let isApproved = await isNFTApproved(collectionAddress, tokenId);
		setIsApproved(isApproved);
		setCheckingApproved(false);
	}

	useEffect(async () => {
		await checkIfNFTApproved();
	}, []);

	const _handlePressButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync(
			`https://alfajores-blockscout.celo-testnet.org/token/${collectionAddress}/instance/${tokenId}/token-transfers`
		);
	};

	async function listNFT() {
		setCreatingMarketItem(true);
		await listItemForSale(collectionAddress, tokenId, price);
		setIsSellNFTModalOpen(false);
		setCreatingMarketItem(false);
	}

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={checkingApproved}
					colors={["darkorchid"]}
					onRefresh={async () => await checkIfNFTApproved()}
				/>
			}>
			<SellModal
				isSellNFTModalOpen={isSellNFTModalOpen}
				setIsSellNFTModalOpen={setIsSellNFTModalOpen}
				setPrice={setPrice}
				price={price}
				name={name}
				listNFT={listNFT}
				creatingMarketItem={creatingMarketItem}
			/>
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
							source={{ uri: creatorObj.profilePicUrl }}
						/>
						<Text>{creatorObj.username}</Text>
					</View>
					<Image
						style={tw.style(styles.image, { width: window.width })}
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
								{seller == undefined ? (
									<>
										{isApproved ? (
											<TouchableOpacity
												onPress={() =>
													setIsSellNFTModalOpen(true)
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
								) : null}
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
			) : null}
		</ScrollView>
	);
}
