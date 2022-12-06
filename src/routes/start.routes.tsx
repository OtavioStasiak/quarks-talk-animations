import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "../screens/List";
import { Dropdown } from "../screens/Dropdown";
import { FloatButton } from "../screens/FloatButton";
import { BottomSheet } from "../screens/BottomSheet";
import { Congratulations } from "../screens/Congratulations";

const Stack = createNativeStackNavigator();

export function StartRoutes(){
    return(
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Dropdown" component={Dropdown} />
            <Stack.Screen name="FloatButton" component={FloatButton} />
            <Stack.Screen name="BottomSheet" component={BottomSheet} />
            <Stack.Screen name="Congratulations" component={Congratulations} />
        </Stack.Navigator>
    )
}