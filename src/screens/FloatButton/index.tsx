import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';

import { styles } from "./styles";


export function FloatButton(){
    const lottieRef = useRef<any>(null);
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {lottieRef.current?.play()}} activeOpacity={.8}>
                <LottieView
                    ref={lottieRef}
                    loop={false}
                    style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'transparent',
                    }}
                    source={require('../../animations/heatSelector.json')}
                />
            </TouchableOpacity>
            <Text style={styles.question}>
                Qual a Melhor Casa de Hogwarts?
            </Text>
        </View>
    )
}