import React, { useCallback, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { cancelAnimation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming,  } from "react-native-reanimated";
import Hogwarts from "../../../assets/hogwarts.png";
import Slytherin from "../../../assets/sonserina.png";
import Ravenclaw from "../../../assets/corvinal.png";
import Hufflepuff from "../../../assets/lufalufa.png";
import Gryffindor from "../../../assets/grifnoria.png";
import LottieView from 'lottie-react-native';

import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
            transform: [
                {rotateZ: `${interpolate(
                    balanceValue.value,
                    [0, .3, .6, 1],
                    [0, 45, -45, 0]
                )}deg`}
            ]
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

        const value = balanceValue.value === 1 ? 0 : 1;

        balanceValue.value = withSpring(value);

        
    };


    function openOptions(){
        const value = slytherinValue.value === 1 ? 0 : 1;


        slytherinValue.value = withTiming(value, {duration: 200});

    };

    useFocusEffect(useCallback(() => {
        slytherinValue.value = withSpring(1);
        setTimeout(() => {
            slytherinValue.value = withSpring(0);
            
        }, 200);
    }, []))



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