import App from "./App";
import AccountContextProvider from "./context/AccountContext";
import CreatorContextProvider from "./context/CreatorContext";
import CreatorsContextProvider from "./context/CreatorsContext";
import UserContextProvider from "./context/UserContext";
import { LogBox } from "react-native";
import { useEffect } from "react";
export default function Root() {
	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
		LogBox.ignoreAllLogs();
	}, []);

	return (
		<AccountContextProvider>
			<UserContextProvider>
				<CreatorsContextProvider>
					<CreatorContextProvider>
						<App />
					</CreatorContextProvider>
				</CreatorsContextProvider>
			</UserContextProvider>
		</AccountContextProvider>
	);
}
