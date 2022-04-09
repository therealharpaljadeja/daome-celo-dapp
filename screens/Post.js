import tw from "twrnc";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getCreatorObjFromAddress } from "../utils/Creators";

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	avatar: tw`w-10 h-10 rounded-full mr-2`,
	image: tw`w-100 h-100`,
	button: tw`bg-purple-500 rounded-md px-6 py-3 my-2 mx-2 flex-1`,
	buttonText: tw`text-white text-center`,
	borderBottom: tw`border-b-2 border-gray-200`,
});

export default function Post({ navigation, route }) {
	let { creatorAddress, name, description, image } = route.params.item;
	const [creatorObj, setCreatorObj] = useState(null);
	const [loadingCreator, setLoadingCreator] = useState(false);

	useEffect(async () => {
		if (route.params.item) {
			setLoadingCreator(true);
			let creatorObj = await getCreatorObjFromAddress(creatorAddress);
			console.log(creatorObj);
			setCreatorObj(creatorObj);
			setLoadingCreator(false);
		}
	}, [route.params.item]);

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
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Approve</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
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
