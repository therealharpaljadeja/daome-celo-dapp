import tw from "twrnc";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import { AccountContext } from "../context/AccountContext";
import { useContext, useReducer } from "react";
import { CreatorsContext } from "../context/CreatorsContext";
import openImagePickerAsync from "../utils/imagePicker";
import { CreatorContext } from "../context/CreatorContext";

const styles = StyleSheet.create({
	textInput: tw`border-gray-200 border-2 rounded-md my-1 px-2`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 flex-1 justify-center`,
	button: tw`bg-purple-500 py-4 rounded-md mb-2`,
	image: tw`rounded-full w-25 h-25 self-center mb-10`,
});

const settingsReducer = (state, action) => {
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
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
};

export function SettingsForm() {
	const { account, connector } = useContext(AccountContext);
	const { creator } = useContext(CreatorsContext);
	const { updateCreatorObj } = useContext(CreatorContext);

	const initialState = {
		account,
		name: creator.name,
		bio: creator.bio,
		nftCollectionName: creator.nftCollectionName,
		nftCollectionSymbol: creator.nftCollectionSymbol,
		profilePicUrl:
			creator.profilePicUrl === ""
				? "https://bit.ly/dan-abramov"
				: creator.profilePicUrl,
		username: creator.username,
	};

	async function uploadToIpfs() {
		let image = await openImagePickerAsync();
		if (image) {
			dispatch({ type: "PFP_URL", payload: image });
		}
	}

	async function disconnect() {
		connector.killSession();
	}

	const [state, dispatch] = useReducer(settingsReducer, initialState);
	return (
		<View style={styles.modal}>
			<TouchableOpacity onPress={uploadToIpfs}>
				<Image
					style={styles.image}
					source={{ uri: state.profilePicUrl }}
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
			<TouchableOpacity
				onPress={() => updateCreatorObj(state)}
				style={styles.button}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 16,
						color: "white",
					}}>
					Save
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={disconnect} style={styles.button}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 16,
						color: "white",
					}}>
					Disconnect
				</Text>
			</TouchableOpacity>
		</View>
	);
}
