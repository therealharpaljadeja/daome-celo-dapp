import App from "./App";
import AccountContextProvider from "./context/AccountContext";
import UserContextProvider from "./context/UserContext";

export default function Root() {
	return (
		<AccountContextProvider>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</AccountContextProvider>
	);
}
