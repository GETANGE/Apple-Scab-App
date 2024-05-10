import React from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Description from '../screens/description';
import Setting from '../screens/settings';
import Home from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: 'grey',
                }
            }}
        >
            <Tab.Screen name={'Home'} component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <Feather
                        name="home"
                        size={24}
                        color={focused ? "green" : "grey"}
                    />
                )
            }} />

            <Tab.Screen name={'Description'} component={Description} options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome5
                        name="leaf"
                        size={24}
                        color={focused ? "green" : "grey"}
                    />
                )
            }} />

            <Tab.Screen name={'Settings'} component={Setting} options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome5
                        name="cog"
                        size={24}
                        color={focused ? "green" : "grey"}
                    />
                )
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;
