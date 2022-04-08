import { useContext, useReducer, useState } from "react";
import {
	Modal,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	ActivityIndicator,
} from "react-native";
import { CreatorContext } from "../context/CreatorContext";
import tw from "twrnc";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import openImagePickerAsync from "../utils/imagePicker";
import { PINATA_API_KEY, PINATA_API_SECRET } from "@env";
import pinataSDK from "@pinata/sdk";

const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const mintReducer = (state, action) => {
	switch (action.type) {
		case "TITLE":
			return { ...state, title: action.payload };
		case "DESCRIPTION":
			return { ...state, description: action.payload };
		case "ROYALTY_PERCENTAGE":
			return { ...state, royaltyPercentage: action.payload };
		case "IMAGE_URL":
			return { ...state, imageUrl: action.payload };
		default:
			return state;
	}
};

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2 py-1`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
});

export default function MintNFTModal({ isMintModalOpen, setIsMintModalOpen }) {
	const initialState = {
		title: "",
		imageUrl: "",
		description: "",
		royaltyPercentage: "",
	};
	const [state, dispatch] = useReducer(mintReducer, initialState);
	const [mintingNFT, setMintingNFT] = useState(null);
	const { mintNFT } = useContext(CreatorContext);

	async function mintNFTUsingModal() {
		setMintingNFT(true);
		let { title, description, imageUrl } = state;
		let nftMetadata = {
			title,
			description,
			image: imageUrl,
		};

		let result = await pinata.pinJSONToIPFS(nftMetadata);
		let url = `https://ipfs.io/ipfs/${result.IpfsHash}`;
		await mintNFT(url, state.royaltyPercentage);
		setIsMintModalOpen(false);
		setMintingNFT(false);
	}

	async function uploadToIpfs() {
		let image = await openImagePickerAsync();
		if (image) {
			dispatch({ type: "IMAGE_URL", payload: image });
		}
	}

	return (
		<Modal transparent={true} visible={isMintModalOpen}>
			<View style={styles.modalOverlay}>
				<View style={styles.modal}>
					<TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setIsMintModalOpen(false)}>
						<AntIcon name='close' size={20} />
					</TouchableOpacity>
					<Text style={tw`text-5 self-center py-4 text-purple-500`}>
						Mint Modal
					</Text>
					<TouchableOpacity onPress={uploadToIpfs}>
						{state.imageUrl === "" ? (
							<View style={tw`h-70 bg-purple-200 rounded-md p-2`}>
								<View
									style={tw`border-dashed items-center justify-center rounded-md border-purple-500 border-2 flex-1`}>
									<FeatherIcon
										name='image'
										size={40}
										color='#a855f7'
									/>
								</View>
							</View>
						) : (
							<Image
								style={tw`h-70 rounded-md`}
								source={{ uri: state.imageUrl }}
							/>
						)}
					</TouchableOpacity>
					<TextInput
						style={styles.textInput}
						value={state.title}
						placeholder='Title'
						onChangeText={(newValue) =>
							dispatch({ type: "TITLE", payload: newValue })
						}
					/>
					<TextInput
						value={state.description}
						onChangeText={(newValue) =>
							dispatch({ type: "DESCRIPTION", payload: newValue })
						}
						style={styles.textInput}
						placeholder='description'
					/>
					<TextInput
						value={state.royaltyPercentage}
						onChangeText={(newValue) =>
							dispatch({
								type: "ROYALTY_PERCENTAGE",
								payload: newValue,
							})
						}
						style={styles.textInput}
						placeholder='royalty'
					/>
					{mintingNFT ? (
						<ActivityIndicator
							animating={true}
							size='small'
							style={tw`py-4`}
							color='#a855f7'
						/>
					) : (
						<TouchableOpacity
							onPress={() => mintNFTUsingModal()}
							style={styles.button}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: "white",
								}}>
								Mint NFT
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Modal>
	);
}
