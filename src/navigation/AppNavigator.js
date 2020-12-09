import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LogInScreen from '../screen/01-login-screen'
import SignUpScreen from '../screen/02-signup-screen'
import AddInforScreen from '../screen/08-AddInfor-screen'
import ForgotPasswordScreen from '../screen/03-forgot-password-screen'
import HomeScreen from '../screen/04-home-screen'
import SuggestDailyScreen from '../screen/05-SuggestDaily-screen'
import YourDailyScreen from '../screen/06-YourDaily'
import AccountSettingScreen from '../screen/07-AccountSetting'
import HistoryScreen from '../screen/09-HistoryScreen'
import DetailScreen from '../screen/10-DetailHistory'
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='health'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={'health'} component={HealthyStack} />
        </Stack.Navigator>
    )
}

const HealthyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Home" component={HomeTab} />
        </Stack.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                headerStyle: {backgroundColor: 'white'},
                headerTintColor:'black',
            }}
        >
            <Stack.Screen
                name="Login"
                component={LogInScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>

            <Stack.Screen
                name="Signup"
                component={SignUpScreen}
            >
            </Stack.Screen>
            <Stack.Screen name="Infor" component={AddInforScreen}>
            </Stack.Screen>
            <Stack.Screen
                name="Forgot"
                component={ForgotPasswordScreen}
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const HomeTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOption={{
                inactiveBackgroundColor: '#9E9CFF',
                activeBackgroundColor: '#9E9CFF',
                tabStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:30
                },
                activeTintColor: 'rgb(255,178,36)',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel:'',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color='black' size={20} />
                    ),
                }}
            ></Tab.Screen>

            <Tab.Screen
                name="SuggestDaily"
                component={SuggestDailyScreen}
                options={{
                    tabBarLabel:"",
                    tabBarIcon: ({color}) => (
                        <Icon name="heart" color='#9E9CFF' size={20} />
                    )
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name="YourDaily"
                component={YourDailyScreen}
                options={{
                    tabBarLabel:"",
                    tabBarIcon: ({ color }) => (
                        <Icon name="list" color='black' size={20} />
                    ),
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}
const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Infor"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={'home'} component={HomeScreen} />
            <Stack.Screen name={'account'} component={AccountSettingScreen} />
            <Stack.Screen name={'detail'} component={DetailScreen} />
            <Stack.Screen name={'history'} component={HistoryScreen} />
        </Stack.Navigator>
    )
}
export const AppNavigator = () => 
          <NavigationContainer>{AppStack()}</NavigationContainer>
    
