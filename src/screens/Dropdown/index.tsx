import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import MonicaFrame from "../../../assets/frame.png";

import { styles } from "./styles";
import { secondQuestionData } from "../../database/list";
import { useQuestions } from "../../hooks";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function Dropdown(){
    const { validateSecondQuestion } = useQuestions();
    const { navigate } = useNavigation();

    const [opened, setOpened] = useState(true);
    const [ selected, setSelected ] = useState("Selecionar");

    const animatedValue = useSharedValue(0);
    const buttonAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(animatedValue.value, 
                [0, .2, .6, .8, 1, 1.2, 1.4, 1.6, 1.8, 2],
                [0, 30, 0, -30, 0, 30, 0, -30, 0, 0],
            )
        }
    });

    function handleContinue(){
        const value = animatedValue.value === 0 ? 2 : 0;
        const validate = validateSecondQuestion(selected);
        
        if(!validate){
            animatedValue.value = withTiming(value, {duration: 200});
            return;
        };
        navigate("FloatButton" as never);
    };
    return(
        <View style={styles.container}>
            <TouchableOpacity 
             onPress={() => setSelected("Selecionar")}
             activeOpacity={.8} 
             style={styles.image}
            >
                <Image 
                style={{width: "100%", height: "100%"}} 
                source={MonicaFrame} 
                />
            </TouchableOpacity>
            <Text style={styles.question}>
             Qual é o sabor de pizza favorita de Joey?
            </Text>

            <TouchableOpacity 
             activeOpacity={.8}
             style={styles.picker}
            >
                <Text style={{color: "#5a189a", fontWeight: "bold"}}>
                {selected}
                </Text>

                <AntDesign name="caretdown" size={18} color="#5a189a" />
            </TouchableOpacity>
            <View style={styles.pickerContent}>
                {
                    secondQuestionData.map((item) =>
                        <TouchableOpacity 
                         key={item.id}
                         onPress={() => setSelected(item.label)} 
                         style={styles.pickerItem}
                        >
                            <Text style={styles.buttonText}>
                             {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <TouchableOpacity onPress={handleContinue} activeOpacity={.8} style={{width: "100%", marginLeft: 20}}>
                <Animated.View style={[styles.button, buttonAnimation]}>
                <Text style={styles.buttonText}>
                CONTINUAR
                </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}