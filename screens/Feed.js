import { useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchMarketItems } from "../utils/NFTMarket";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import tw from "twrnc";

export default function FeedScreen() {
	const [items, setItems] = useState([]);
	useEffect(async () => {
		let items = await fetchMarketItems();
		setItems(items);
	}, []);

	return (
		<SafeAreaView style={tw`px-0 py-0 bg-red-100`}>
			{items !== undefined && items.length > 0 ? (
				<FlatList
					data={items}
					renderItem={({ item }) => <Post nft={item} />}
					keyExtractor={(nft) => {
						return `${nft.collectionAddress}-${nft.tokenId}`;
					}}
				/>
			) : (
				<></>
			)}
		</SafeAreaView>
	);
}
