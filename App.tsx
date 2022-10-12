import UserIDPage from "./components/userIDPage";
import UserDetails from "./components/userDetails";
// Stack Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoaderProvider } from "./context/loaderProvider";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LoaderProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4c2c2",
            },
          }}
        >
          <Stack.Screen
            name="UserID"
            component={UserIDPage}
            options={{ title: "User Login" }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{
              title: "User Details",
              headerBackTitleStyle: { fontSize: 20 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LoaderProvider>
  );
}
