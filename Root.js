import App from "./App";
import AccountContextProvider from "./context/AccountContext";
import CreatorContextProvider from "./context/CreatorsContext";
import UserContextProvider from "./context/UserContext";

export default function Root() {
	return (
		<AccountContextProvider>
			<UserContextProvider>
				<CreatorContextProvider>
					<App />
				</CreatorContextProvider>
			</UserContextProvider>
		</AccountContextProvider>
	);
}
