import tw from "twrnc";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	rowFlex: tw`flex-row`,
	avatar: tw`w-10 h-10 rounded-full mr-2`,
	image: tw`w-100 h-100`,
	button: tw`bg-purple-500 rounded-md px-6 py-3 my-2 mx-2 flex-1`,
	buttonText: tw`text-white text-center`,
	borderBottom: tw`border-b-2 border-gray-200`,
});

export default function Post() {
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
					source={{ uri: "https://bit.ly/dan-abramov" }}
				/>
				<Text>username</Text>
			</View>
			<Image
				style={tw.style(styles.image, "border-b-2")}
				source={{
					uri: "https://www.pinkvilla.com/imageresize/decoding_nfts_what_are_nfts_and_how_do_they_work_all_you_need_to_know.jpg?width=752&format=webp&t=pvorg",
				}}
			/>
			<View
				style={tw.style(
					`px-4 py-2 bg-white border-t-2`,
					styles.borderBottom
				)}>
				<Text>Bored Ape #1239</Text>
				<Text>Bored Ape Collection</Text>
			</View>
			<View style={tw`justify-center px-2 bg-white flex-row `}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Approve</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>View on Explorer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
