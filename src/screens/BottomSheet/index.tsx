import React, { useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import UpsideDown from "../../../assets/upsidedown.png";
import Team from "../../../assets/team.png";
import { styles } from "./styles";
import LottieView from 'lottie-react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { forthQuestionData } from "../../database/list";
import { useQuestions } from "../../hooks";

export function BottomSheet(){
    const { validateForthQuestion } = useQuestions();
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

    function onSelect(name: string){
        const validate = validateForthQuestion(name);
        if(validate){
            setOpened(true);
            animatedValue.value = withTiming(1);    
        }
        
    };
    return(
        <View style={styles.container}>
            <Image source={Team} style={{width:350, height: 240, marginTop: "40%"}} />
            {   
            !opened &&
                <>
                <Text style={[styles.optionTitle, {fontSize: 23, marginBottom: 10}]}>Qual o nome da mãe da Eleven?</Text>
                {forthQuestionData.map((item) =>
                    <TouchableOpacity onPress={() => onSelect(item.label)} style={styles.option} key={item.id}>
                        <Text style={styles.optionTitle}>
                        {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                </>
            }
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