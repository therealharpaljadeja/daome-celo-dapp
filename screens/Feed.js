import { useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchMarketItems } from "../utils/NFTMarket";
import { FlatList, RefreshControl, ScrollView } from "react-native";

export default function FeedScreen() {
	const [items, setItems] = useState([]);
	const [fetchingItems, setFetchingItems] = useState(false);
	async function marketItemsFetch() {
		let items = await fetchMarketItems();
		setItems(items);
	}
	useEffect(async () => {
		setFetchingItems(true);
		await marketItemsFetch();
		setFetchingItems(false);
	}, []);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					onRefresh={async () => await marketItemsFetch()}
					refreshing={fetchingItems}
					colors={["darkorchid"]}
				/>
			}>
			<FlatList
				data={items}
				renderItem={({ item }) => <Post nft={item} />}
				keyExtractor={(nft) => {
					return `${nft.collectionAddress}-${nft.tokenId}`;
				}}
			/>
		</ScrollView>
	);
}
