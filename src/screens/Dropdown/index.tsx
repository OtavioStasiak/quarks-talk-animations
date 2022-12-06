import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
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

    const caretAnimatedValue = useSharedValue(0);
    const caretAnimation = useAnimatedStyle(() => {
        return{
            transform: [
                {rotateX:`${interpolate(
                    caretAnimatedValue.value,
                    [0, 1],
                    [0, 180]
                )}deg`}
            ]
        }
    });

    const contentAnimation = useAnimatedStyle(() => {
        return{
         marginTop:50,
         height: interpolate(caretAnimatedValue.value, [0, 1], [0, 200]),
        }
    });


    function handleOpenSelect(){
        const caretValue = caretAnimatedValue.value === 0 ? 1 : 0;
        
        caretAnimatedValue.value = withTiming(caretValue, {duration: 200});
        
    };

    function handleSelectItem(item: string){
        setSelected(item);
        caretAnimatedValue.value = withTiming(0, {duration: 200});

    }
   
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


          
                <Animated.View style={[styles.pickerContent, contentAnimation]}>
                    <ScrollView style={{paddingTop: 10}} showsVerticalScrollIndicator={false}>
                    {
                        secondQuestionData.map((item) =>
                            <TouchableOpacity 
                            key={item.id}
                            onPress={() => {
                                handleSelectItem(item.label)
                            }} 
                            style={styles.pickerItem}
                            >
                                <Text style={styles.buttonText}>
                                {item.label}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    </ScrollView>
                </Animated.View>
            

                <TouchableOpacity 
             onPress={handleOpenSelect}
             activeOpacity={.8}
             style={styles.picker}
            >
                <Text style={{color: "#5a189a", fontWeight: "bold"}}>
                {selected}
                </Text>
                <Animated.View style={caretAnimation}>
                    <AntDesign name="caretdown" size={18} color="#5a189a" />
                </Animated.View>
            </TouchableOpacity>

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