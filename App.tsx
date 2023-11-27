// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeIcon from './src/assets/icons/home.svg';
import CategoryIcon from './src/assets/icons/category.svg';
import HeartIcon from './src/assets/icons/heart.svg';
import DotsIcon from './src/assets/icons/dots.svg';
import HomeScreen from './src/screens/homeScreen/Home';
import CategoriesScreen from './src/screens/homeScreen/Home'; // Make sure to import the correct component
import FavoritesScreen from './src/screens/homeScreen/Home'; // Make sure to import the correct component
import MoreScreen from './src/screens/homeScreen/Home'; // Make sure to import the correct component
import ProductScreen from './src/screens/productScreen/productScreen';
import CartScreen from './src/screens/cartScreen/cartScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home">

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <HomeIcon />
          ),
        }} />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <CategoryIcon />
          ),
        }} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <HeartIcon />
          ),
        }} />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <DotsIcon />
          ),
        }} />
    </Tab.Navigator>
  );
};

export default App;
