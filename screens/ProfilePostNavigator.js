import { createStackNavigator } from "@react-navigation/stack";
import Post from "./Post";
import ProfileScreen from "./Profile";

const Stack = createStackNavigator();

export default function ProfilePostNavigator() {
	return (
		<Stack.Navigator initialRouteName='Profile'>
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='Post' component={Post} />
		</Stack.Navigator>
	);
}
