import React from "react";
import { Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";

export function Congratulations(){
    return(
        <View style={styles.container}>
            <StatusBar style="light" />
              <LottieView
                autoPlay
                loop
                style={{
                width: "100%",
                height: 230,
                }}
                source={require('../../animations/morty.json')}
            />
            <Text style={styles.success}>
                SUCESSO!
            </Text>

            <Text style={styles.message}>
                Obrigado por participar!
            </Text>
        
        </View>
    )
}