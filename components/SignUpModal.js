import {
	View,
	Modal,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import { useState, useEffect, useContext, useReducer } from "react";
import { AccountContext } from "../context/AccountContext";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import { CreatorsContext } from "../context/CreatorsContext";
import openImagePickerAsync from "../utils/imagePicker";
import { PINATA_API_KEY, PINATA_API_SECRET } from "@env";
import pinataSDK from "@pinata/sdk";
import { UserContext } from "../context/UserContext";

const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
	image: tw`rounded-full w-25 h-25 self-center mb-4`,
});

const registerReducer = (state, action) => {
	switch (action.type) {
		case "ACCOUNT":
			return { ...state, account: action.payload };
		case "NAME":
			return { ...state, name: action.payload };
		case "USERNAME":
			return { ...state, username: action.payload };
		case "BIO":
			return { ...state, bio: action.payload };
		case "NFT_COLLECTION_NAME":
			return { ...state, nftCollectionName: action.payload };
		case "NFT_COLLECTION_SYMBOL":
			return { ...state, nftCollectionSymbol: action.payload };
		case "PFP_URL":
			return { ...state, profilePicUrl: action.payload };
		case "PFP":
			return { ...state, pfp: action.payload };
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
};

export default function SignUpModal() {
	const initialState = {
		account: "",
		name: "",
		bio: "",
		nftCollectionName: "",
		nftCollectionSymbol: "",
		profilePicUrl: "https://bit.ly/dan-abramov",
		username: "",
		pfp: "https://bit.ly/dan-abramov",
	};
	const [state, dispatch] = useReducer(registerReducer, initialState);
	const { account } = useContext(AccountContext);
	const { registerUser } = useContext(CreatorsContext);
	const { checkIfUserRegistered, setUserRegistered } =
		useContext(UserContext);
	const [registeringUser, setRegisteringUser] = useState(null);

	const [modalOpen, setModalOpen] = useState(true);

	useEffect(() => {
		dispatch({ type: "ACCOUNT", payload: account });
		Toast.show({
			type: "info",
			text1: "User not registered",
			text2: "Please register first to proceed",
		});
	}, []);

	async function callRegisterUser() {
		setRegisteringUser(true);
		let creatorObj = {
			name: state.name,
			username: state.username,
			bio: state.bio,
			profilePicUrl: state.profilePicUrl,
			nftCollectionName: state.nftCollectionName,
			nftCollectionSymbol: state.nftCollectionSymbol,
		};
		await registerUser(creatorObj);
		let result = await checkIfUserRegistered();
		setUserRegistered(result);
		setRegisteringUser(false);
	}

	async function uploadToIpfs() {
		let image = await openImagePickerAsync();

		if (image) {
			let nftMetadata = {
				name: state.username,
				image: image,
			};

			let result = await pinata.pinJSONToIPFS(nftMetadata);
			let url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
			dispatch({ type: "PFP", payload: image });
			dispatch({ type: "PFP_URL", payload: url });
		}
	}

	return (
		<Modal transparent={true} visible={modalOpen}>
			<View style={styles.modalOverlay}>
				<Toast />
				<View style={styles.modal}>
					{/* <TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setModalOpen(false)}>
						<Icon name='close' size={20} />
					</TouchableOpacity> */}
					<Text style={tw`text-5 self-center py-2 text-purple-500`}>
						Sign Up
					</Text>
					<TouchableOpacity onPress={uploadToIpfs}>
						<Image
							style={styles.image}
							source={{ uri: state.pfp }}
						/>
					</TouchableOpacity>
					<TextInput
						style={styles.textInput}
						value={state.account}
						editable={false}
					/>
					<TextInput
						style={styles.textInput}
						value={state.username}
						placeholder='username'
						onChangeText={(newValue) =>
							dispatch({ type: "USERNAME", payload: newValue })
						}
					/>
					<TextInput
						value={state.name}
						onChangeText={(newValue) =>
							dispatch({ type: "NAME", payload: newValue })
						}
						style={styles.textInput}
						placeholder='name'
					/>
					<TextInput
						multiline={true}
						numberOfLines={4}
						placeholder='bio'
						style={styles.textInput}
						value={state.bio}
						onChangeText={(newValue) =>
							dispatch({ type: "BIO", payload: newValue })
						}
					/>
					<TextInput
						placeholder='NFT Collection Name'
						style={styles.textInput}
						value={state.nftCollectionName}
						onChangeText={(newValue) =>
							dispatch({
								type: "NFT_COLLECTION_NAME",
								payload: newValue,
							})
						}
					/>
					<TextInput
						style={styles.textInput}
						value={state.nftCollectionSymbol}
						onChangeText={(newValue) =>
							dispatch({
								type: "NFT_COLLECTION_SYMBOL",
								payload: newValue,
							})
						}
						placeholder='NFT Collection Symbol'
					/>
					{registeringUser ? (
						<ActivityIndicator
							animating={true}
							size='small'
							style={tw`py-4`}
							color='#a855f7'
						/>
					) : (
						<TouchableOpacity
							onPress={() => callRegisterUser()}
							style={styles.button}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: "white",
								}}>
								Sign Up
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Modal>
	);
}
