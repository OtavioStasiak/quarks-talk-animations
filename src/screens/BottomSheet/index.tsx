import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import UpsideDown from "../../../assets/upsidedown.png";
import Team from "../../../assets/team.png";
import { styles } from "./styles";
import LottieView from 'lottie-react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function BottomSheet(){

    const animatedValue = useSharedValue(0);
    const [opened, setOpened] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(
                animatedValue.value,
                [0, 1], 
                [500, 0])
        }
    }, []);

    function onSelect(){
        setOpened(true);
        animatedValue.value = withTiming(1);
    };
    return(
        <View style={styles.container}>
            <Image source={Team} style={{width:350, height: 240, marginTop: "40%"}} />
            {   !opened &&
                <TouchableOpacity onPress={onSelect}>
                <View  style={{width: 100, height: 100, backgroundColor: "white"}} />
            </TouchableOpacity>}
            <Animated.View style={[styles.bottomSheet, animatedStyle]}>
                <Image source={UpsideDown} style={{width:350, height: 240, marginTop: -30}} />
                <LottieView
                autoPlay
                loop
                style={{
                width: "130%",
                height: 610,
                marginTop: -170,
                position: "absolute",
                transform: [{rotate: "180deg"}],
                backgroundColor: 'transparent',
                }}
                source={require('../../animations/embers.json')}
            />
            <LottieView
                autoPlay
                loop
                style={{
                width: "130%",
                height: 610,
                marginTop: -170,
                position: "absolute",
                transform: [{rotate: "180deg"}],
                backgroundColor: 'transparent',
                }}
                source={require('../../animations/embers.json')}
            />
            <LottieView
                autoPlay
                loop
                style={{
                width: "100%",
                height: 500,
                marginTop: -20,
                position: "absolute",
                transform: [{rotate: "180deg"}],
                backgroundColor: 'transparent',
                }}
                source={require('../../animations/redlightning.json')}
            />
            </Animated.View>
        </View>
       
    )
}