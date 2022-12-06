import React, { useCallback, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { cancelAnimation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";
import Hogwarts from "../../../assets/hogwarts.png";
import Slytherin from "../../../assets/sonserina.png";
import Ravenclaw from "../../../assets/corvinal.png";
import Hufflepuff from "../../../assets/lufalufa.png";
import Gryffindor from "../../../assets/grifnoria.png";
import LottieView from 'lottie-react-native';

import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuestions } from "../../hooks";
import { PanGestureHandler } from "react-native-gesture-handler";


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
            top: interpolate(slytherinValue.value, [0, 1], [15, -10])
        }
    });

    const ravenclawAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(slytherinValue.value, [0, 1], [0, 85]),
            top: interpolate(slytherinValue.value, [0, 1], [-90, 10])
        }
    });

    const hufflepuffAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(slytherinValue.value, [0, 1], [0, -80]),
            top: interpolate(slytherinValue.value, [0, 1], [-200, 10])
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
    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const animatedGestureStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value}
            ]
        }
    })


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

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(){
            
        },
        onActive(event){
            positionX.value = (event.translationX * .8),
            positionY.value = (event.translationY * .5)
        },
        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    })

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
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={animatedGestureStyle}>
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
                </Animated.View>
            </PanGestureHandler>
            
        </View>
    )
}