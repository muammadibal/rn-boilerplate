import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, createNavigationContainerRef, getFocusedRouteNameFromRoute, useNavigation, useNavigationState } from '@react-navigation/native'
import { Help, Home, Order, OrderHistory, Profile } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { color, color as tColor, theme } from '../utils/constant';
import { MD3DarkTheme, PaperProvider, MD3LightTheme } from 'react-native-paper';
import { useAppSelector } from '../redux/hooks';
import { appSelector } from '../redux/reducers';

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
    return route.name === tabName;
}

const CenterButton = ({ onPress, backgroundColor }: {onPress: any; backgroundColor?: string;}) => (
    <TouchableOpacity onPress={onPress} style={{position: 'absolute', bottom: 90, left: '50%', marginLeft: -30, zIndex: 10, backgroundColor: tColor.gold[500], width: 60, height: 60, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 6, borderColor: backgroundColor}}>
      <FontAwesome6 name="scissors" color={backgroundColor} size={24}/>
    </TouchableOpacity>
);

export const tabs = [
  {
    name: "Home",
    label: "Home",
    component: Home,
    icon: "house",
  },
  {
    name: "OrderHistory",
    label: "Order",
    component: OrderHistory,
    icon: "table-list",
  },
  {
    name: "Help",
    label: "Help",
    component: Help,
    icon: "headset",
  },
  {
    name: "Profile",
    label: "Profile",
    component: Profile,
    icon: "user",
  },
]

const MainApp = ({navigation, route}: any) => {
    const {theme: appTheme} = useAppSelector(appSelector)
    const backgroundColor = appTheme === 'dark' ? color.grey[600] : color.white[500]

    return <>
        <Tab.Navigator activeColor={tColor.gold[500]}
        inactiveColor={tColor.grey[500]} barStyle={{ backgroundColor }} activeIndicatorStyle={{ 
            height: 4,
            backgroundColor: tColor.gold[500],
            marginBottom: "auto",
            marginTop: -12,
        }}>
          {tabs.map(v => {
            return <Tab.Screen key={v.label} name={v.name} component={v.component} options={{
              tabBarLabel: v.label,
              tabBarIcon: ({ focused, color }) => (
                <FontAwesome6 name={v.icon} size={26} color={color} />
              ),
              }}/>
          })}            
        </Tab.Navigator>
        {route?.name === 'MainApp' ? <CenterButton backgroundColor={backgroundColor} onPress={() => navigate("Order")}/> : null}
    </>
}

const Router = () => {   
  const {theme: appTheme} = useAppSelector(appSelector)
  const paperTheme = {
    ...MD3LightTheme,
    roundness: 10,
    colors: appTheme === 'dark' ? {...MD3DarkTheme.colors, background: theme.background.dark, onBackground: theme.background.light} : {...MD3LightTheme.colors, background: theme.background.light, onBackground: theme.background.dark},
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer ref={navigationRef}>
          <Stack.Navigator 
              screenOptions={{ 
                  headerShown: false
              }}
          >
              <Stack.Screen name="MainApp" component={MainApp}/>
              <Stack.Screen name="Order" component={Order} />
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Router