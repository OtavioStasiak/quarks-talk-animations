import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { cancelAnimation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming,  } from "react-native-reanimated";
import Hogwarts from "../../../assets/hogwarts.png";
import Slytherin from "../../../assets/sonserina.png";
import Ravenclaw from "../../../assets/corvinal.png";
import Hufflepuff from "../../../assets/lufalufa.png";
import Gryffindor from "../../../assets/grifnoria.png";
import LottieView from 'lottie-react-native';

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useQuestions } from "../../hooks";


export function FloatButton(){
    const lottieRef = useRef<any>(null);
    const { navigate } = useNavigation();
    const { validateThirdQuestion } = useQuestions();

    const slytherinValue = useSharedValue(0);

    const slytherinAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(slytherinValue.value, [0, 1], [0, 80]),
            top: interpolate(slytherinValue.value, [0, 1], [90, -10])
        }
    });

    const gryffindorAnimation = useAnimatedStyle(() => {
        return{
            right: interpolate(slytherinValue.value, [0, 1], [0, 80]),
            top: interpolate(slytherinValue.value, [0, 1], [90, -10])
        }
    });

    const ravenclawAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(slytherinValue.value, [0, 1], [0, 85]),
            top: interpolate(slytherinValue.value, [0, 1], [-110, 10])
        }
    });

    const hufflepuffAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(slytherinValue.value, [0, 1], [0, -80]),
            top: interpolate(slytherinValue.value, [0, 1], [-110, 10])
        }
    });

    const balanceValue = useSharedValue(0);
    const balanceAnimation = useAnimatedStyle(() => {
        return{
            top: interpolate(balanceValue.value, [0, 1], [-25, 25])
        }
    });

    function onConfirm(house: string){
        const validate = validateThirdQuestion(house);
        if(validate === true){
            lottieRef.current?.play();

            setTimeout(() => {
                navigate("BottomSheet" as never);
            }, 2000);

            return;
        };

        
    };


    function openOptions(){
        const value = slytherinValue.value === 1 ? 0 : 1;
        const balance = balanceValue.value > 0 ?  1 : 0;

        slytherinValue.value = withTiming(value, {duration: 200});
        balanceValue.value = withRepeat(withTiming(1, {duration: 650}), 200, true); 

        if(balance === 0){
            balanceValue.value = withTiming(0);

            setTimeout(() => {
                cancelAnimation(balanceValue);                
            }, 50);
            return;
        };
        
    };


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
            
            <Animated.View style={[styles.slytherin, slytherinAnimation, balanceAnimation]}>
                <TouchableOpacity onPress={() => onConfirm("slytherin")}>
                <Image 
                 source={Slytherin} 
                 style={{width: 100,height: 100}} 
                />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.gryffindor, gryffindorAnimation, balanceAnimation]}>
                <TouchableOpacity onPress={() => onConfirm("gryffindor")}>
                    <Image 
                    resizeMode="contain"  
                    source={Gryffindor} 
                    style={{width: 100,height: 100}} 
                    />
                </TouchableOpacity>
            </Animated.View> 

            <Animated.View style={[styles.ravenclaw, ravenclawAnimation, balanceAnimation]}>
                <TouchableOpacity onPress={() => onConfirm("ravenclaw")}>
                    <Image 
                    resizeMode="contain" 
                    source={Ravenclaw} 
                    style={{width: 100,height: 100}} 
                    />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.hufflepuff, hufflepuffAnimation, balanceAnimation]}>
                <TouchableOpacity onPress={() => onConfirm("Hufflepuff")}>
                    <Image 
                    resizeMode="contain" 
                    source={Hufflepuff} 
                    style={{width: 100,height: 100}} 
                    />
                </TouchableOpacity>
            </Animated.View>
        
            <TouchableOpacity activeOpacity={1} onPress={openOptions} style={styles.floatButton} >
                <Image 
                 resizeMode="contain" 
                 source={Hogwarts} 
                 style={{width: 100,height: 100}} 
                />
            </TouchableOpacity>
            
        </View>
    )
}