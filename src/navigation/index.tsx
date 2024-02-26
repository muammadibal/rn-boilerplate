import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, createNavigationContainerRef, getFocusedRouteNameFromRoute, useNavigation, useNavigationState } from '@react-navigation/native'
import { Help, Home, Order, OrderHistory, Profile } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { color as tColor } from '../utils/constant';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Home: undefined;
    Order: undefined; // { itemId: number }
    OrderHistory: undefined; // { itemId: number }
    Help: undefined;
    Profile: undefined;
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
    ...args: RouteName extends unknown
      ? undefined extends RootStackParamList[RouteName]
        ?
            | [screen: RouteName]
            | [screen: RouteName, params: RootStackParamList[RouteName]]
        : [screen: RouteName, params: RootStackParamList[RouteName]]
      : never
  ) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(...args);
    }
  }

export function reset(params: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset(params);
  }
}

export function isTabActive(tabName: string): boolean {
    const route = useNavigationState(state => state.routes[state.index]);
    return getFocusedRouteNameFromRoute(route) === tabName;
}

const CenterButton = ({ onPress }: {onPress: any}) => (
    <TouchableOpacity onPress={onPress} style={{position: 'absolute', bottom: 90, left: '50%', marginLeft: -30, zIndex: 10, backgroundColor: tColor.gold[500], width: 60, height: 60, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 6, borderColor: tColor.black[500]}}>
      <FontAwesome6 name="scissors" color={tColor.black[500]} size={24}/>
    </TouchableOpacity>
);

const MainApp = ({navigation, route}: any) => {
    return <>
        <Tab.Navigator activeColor={tColor.gold[500]}
        inactiveColor={tColor.grey[500]} barStyle={{ backgroundColor: tColor.black[500] }} activeIndicatorStyle={{ 
            height: 4,
            backgroundColor: tColor.gold[500],
            marginBottom: "auto",
            marginTop: -12,
        }}>
            <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarColor: tColor.gold[500],
            tabBarIcon: ({ focused, color }) => (
                <FontAwesome6 name="house" color={color} size={22} />
            ),
            }}/>
            <Tab.Screen name="OrderHistory" component={OrderHistory} options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ focused, color }) => (
                <FontAwesome6 name="table-list" color={color} size={26} />
            ),
            }}/>
            <Tab.Screen name="Help" component={Help} options={{
            tabBarLabel: 'Help',
            tabBarIcon: ({ focused, color }) => (
                <FontAwesome6 name="headset" color={color} size={26} />
            ),
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color }) => (
                <FontAwesome6 name="user" color={color} size={26} />
            ),
            }}/>
        </Tab.Navigator>
        {route?.name === 'MainApp' ? <CenterButton onPress={() => navigate("Order")}/> : null}
    </>
}

const Router = () => {    
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
            // screenOptions={{ 
            //     headerShown: false
            // }}
        >
            <Stack.Screen name="MainApp" component={MainApp} options={{ 
                headerShown: false
             }} />
            <Stack.Screen name="Order" component={Order} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router