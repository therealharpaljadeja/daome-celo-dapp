import App from "./App";
import AccountContextProvider from "./context/AccountContext";
import CreatorContextProvider from "./context/CreatorContext";
import CreatorsContextProvider from "./context/CreatorsContext";
import UserContextProvider from "./context/UserContext";

export default function Root() {
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
