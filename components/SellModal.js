import {
	Modal,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import AntIcon from "react-native-vector-icons/AntDesign";

const styles = StyleSheet.create({
	textInput: tw`text-4xl my-1 px-2 py-1 self-center`,
	modalOverlay: tw`p-5 justify-center flex-1 bg-gray-500/50`,
	modal: tw`bg-white p-3 rounded-md shadow-md`,
	button: tw`bg-purple-500 py-4 rounded-md`,
	text: tw`self-center mb-2`,
});

export default function SellModal({
	isSellNFTModalOpen,
	setIsSellNFTModalOpen,
	name,
	setPrice,
	price,
	listNFT,
	creatingMarketItem,
}) {
	return (
		<Modal transparent={true} visible={isSellNFTModalOpen}>
			<View style={styles.modalOverlay}>
				<View style={styles.modal}>
					<TouchableOpacity
						size='200'
						style={{
							alignSelf: "flex-end",
						}}
						onPress={() => setIsSellNFTModalOpen(false)}>
						<AntIcon name='close' size={20} />
					</TouchableOpacity>
					<Text style={tw`text-5 self-center py-4 text-purple-500`}>
						Sell {name}
					</Text>
					<TextInput
						style={styles.textInput}
						value={price}
						placeholder='0'
						onChangeText={(newValue) => setPrice(newValue)}
					/>
					<Text style={styles.text}>$CELO</Text>
					<Text style={styles.text}>Listing Fee: 0.025 $CELO</Text>
					{price - 0.025 <= 0 ? (
						<Text
							style={styles.text}>{`Listing For: 0 $CELO`}</Text>
					) : (
						<Text style={styles.text}>{`Listing For: ${
							price - 0.025
						} $CELO`}</Text>
					)}

					{creatingMarketItem ? (
						<ActivityIndicator
							animating={true}
							size='small'
							style={tw`py-4`}
							color='#a855f7'
						/>
					) : (
						<TouchableOpacity
							onPress={listNFT}
							style={styles.button}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: "white",
								}}>
								Sell NFT
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Modal>
	);
}
