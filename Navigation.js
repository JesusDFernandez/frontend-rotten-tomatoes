import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Dashboard from './src/components/Dashboard';
import Chat from './src/components/Chat';
import DetailsMovie from './src/components/DetailsMovie';
import ModalLogout from './src/components/ModalLogout';
import DashboardChat from './src/components/DashboardChat';
import DashboardComment from './src/components/DashboardComment';

const Stack = createNativeStackNavigator();

export function Navigation() {


    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true, headerTitle: '',
                    headerStyle: { backgroundColor: "transparent", opacity: 0 },
                    headerTitleStyle: { color: "red" },
                }}
            >

                <Stack.Screen name="Login" component={Login}
                    options={{
                        headerTransparent: true, headerTitle: '', headerStyle: { backgroundColor: "transparent", opacity: 0 },
                        headerTitleStyle: { color: "#ffffff" },
                    }}
                />
                <Stack.Screen name="Dashboard" component={Dashboard}
                    options={{
                        headerTransparent: true,
                        headerTitle: '',
                        headerStyle: { backgroundColor: "transparent", opacity: 0 },
                        headerTitleStyle: { color: "black" },
                        headerBackVisible: false,
                        headerRight: () => <ModalLogout />
                    }}
                />

                <Stack.Screen name="Signup" component={Signup}
                    options={{
                        headerTransparent: true,
                        headerTitle: '',
                        headerStyle: { backgroundColor: "transparent", opacity: 0 },
                        headerTitleStyle: { color: "#ffffff", },
                        headerTintColor: "white"
                    }}
                />
                <Stack.Screen name="DetailsMovie" component={DetailsMovie}
                    options={{
                        headerTransparent: true,
                        headerTitle: '',
                        headerStyle: { backgroundColor: "transparent", opacity: 0 },
                        headerTintColor: "white"

                    }}
                />

                <Stack.Screen name="DashboardComment" component={DashboardComment}
                    options={{
                        headerTransparent: true,
                        headerTitle: '',
                        headerStyle: { backgroundColor: "transparent", opacity: 0 },
                        headerTintColor: "white"

                    }}
                />

                <Stack.Screen name="DashboardChat" component={DashboardChat}
                    options={() => ({
                        headerTitle: "Chats",
                        headerTitleStyle: { color: "white" },
                        headerTitleAlign: 'center',
                        headerTintColor: "white",
                        headerTransparent: true,
                        headerStyle: {
                            backgroundColor: "rgba(103, 114, 148, 0.16)"
                        }

                    })}
                />

                <Stack.Screen name="Chat" component={Chat}
                    options={({ route }) => ({
                        headerTitle: route.params?.userName.toUpperCase() || "chat",
                        headerTitleStyle: { color: "black" },
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: 'white'
                        },

                    })}
                />

            </Stack.Navigator>
        </NavigationContainer >
    );
}