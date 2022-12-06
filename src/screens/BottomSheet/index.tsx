import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import UpsideDown from "../../../assets/upsidedown.png";
import Vecna from "../../../assets/vecna.jpg";
import Team from "../../../assets/team.png";
import { styles } from "./styles";
import LottieView from 'lottie-react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { forthQuestionData } from "../../database/list";
import { useQuestions } from "../../hooks";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";



export function BottomSheet(){
    const { validateForthQuestion } = useQuestions();
    const animatedValue = useSharedValue(0);
    const [opened, setOpened] = useState(false);

    const sound = React.useRef(new Audio.Sound());

    async function loadAudio(){
        const load = await sound.current.loadAsync(require("../../../assets/vecna.mp3"))
    }
    useEffect(() => {
        loadAudio();
    }, []);

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
            
            return;
        };
        const value = vecnaValue.value === 1 ? 0 : 1;
        const earthquake = vecnaValue.value === 1 ? 0 : 1;
        sound.current.setPositionAsync(0);
        sound.current.playAsync();
        vecnaValue.value = withTiming(value, {duration: 5800});
        earthquakeValue.value = withRepeat(withTiming(earthquake, {duration: 170}), 30);
        
    };

    const vecnaValue = useSharedValue(0);

    const vecnaStyle = useAnimatedStyle(() => {
        return{
            opacity: interpolate(vecnaValue.value, 
                [0, .3, .8, 1],
                [0, 1, 1, 0]
            )
        }
    });

    const earthquakeValue = useSharedValue(0);

    const earthquakeStyle = useAnimatedStyle(() => {
        return{
           left: interpolate(earthquakeValue.value,
                [0, .3, .6, 1],
                [0 , 5, -5, 0 ]
            )
        }
    });



    return(
        <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.Image 
             source={Vecna} 
             style={[{width:390, height: 378, marginBottom: 1, position: "absolute"}, vecnaStyle]} 
             />
          
            <Animated.Image source={Team} style={[earthquakeStyle, {width:350, height: 230, marginTop: "40%"}]} />

            {   
                !opened &&
                <>
                <Text style={[styles.optionTitle, {fontSize: 23, marginBottom: 10}]}>Qual o nome da mãe da Eleven?</Text>
                {forthQuestionData.map((item) =>
                    <TouchableOpacity onPress={() => onSelect(item.label)} style={styles.option}key={item.id}>
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