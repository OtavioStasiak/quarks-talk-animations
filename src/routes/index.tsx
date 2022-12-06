import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StartRoutes } from "./start.routes";

export function Routes(){
    return(
        <NavigationContainer>
            <StartRoutes />
        </NavigationContainer>
    )
}