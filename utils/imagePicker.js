import axios from "axios";
import { PINATA_API_KEY, PINATA_API_SECRET } from "@env";
import pinataSDK from "@pinata/sdk";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
export default async function openImagePickerAsync() {
	let permissionResult =
		await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (permissionResult.granted === false) {
		alert("Permission to access camera roll is required!");
		return false;
	}

	let pickerResult = await ImagePicker.launchImageLibraryAsync();

	let fileData = await FileSystem.readAsStringAsync(pickerResult.uri, {
		encoding: FileSystem.EncodingType.Base64,
	});

	let result = await pinata.pinJSONToIPFS({
		name: "pfp",
		image: `data:image/png;base64,${fileData}`,
	});

	let url = `https://ipfs.io/ipfs/${result.IpfsHash}`;
	let response = await axios.get(url);
	let image = response.data.image;
	return image;
}
