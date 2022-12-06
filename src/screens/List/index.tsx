import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { firstQuestionData } from "../../database/list";
import { styles } from "./styles";
import { useQuestions } from "../../hooks";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function List(){
    const { validateFirstQuestion } = useQuestions();
    const { navigate } = useNavigation();
    const [list, setList] = useState(firstQuestionData);

    const animatedValue = useSharedValue(0);
    const buttonAnimation = useAnimatedStyle(() => {
        return{
            left: interpolate(animatedValue.value, 
                [0, .2, .6, .8, 1, 1.2, 1.4, 1.6, 1.8, 2],
                [0, 30, 0, -30, 0, 30, 0, -30, 0, 0],
            )
        }
    });

    function onRemoveItem(id: number){
        const actualList = list;
        const removeItem = actualList.filter(item => item.id !== id);

        setList(removeItem);
    };

    function handleContinue(listItem : any[]){
        const value = animatedValue.value === 0 ? 2 : 0;
        const validate = validateFirstQuestion(listItem);
        if(!validate){
            animatedValue.value = withTiming(value, {duration: 200});
            return;
        };
        navigate("Dropdown" as never);
    };

    return(
        <View style={styles.container}>
        
        <TouchableOpacity activeOpacity={.8} onPress={() => setList(firstQuestionData)}>
            <LottieView
                autoPlay
                loop
                style={{
                width: 200,
                height: 220,
                backgroundColor: 'transparent',
                }}
                source={require('../../animations/batman.json')}
            />
        </TouchableOpacity>
            <Text style={styles.question}>
            Retire os atores que não interpretaram o Batman para passar pra próxima fase:
            </Text>

            <View style={styles.listContainer}>
                <ScrollView style={{width: "100%"}}>
                    {
                        list.map((item) =>
                            <View style={styles.listItem} key={item.id}>
                                <Text style={styles.label}>
                                    {item.label}
                                </Text>

                                    
                                <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={{padding: 5}}>
                                    <MaterialCommunityIcons name="close-thick" size={24} color="#c22a2a" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </ScrollView>
                <TouchableOpacity style={{width: "95%", marginLeft: 20}} activeOpacity={.8} onPress={() => handleContinue(list)}>
                <Animated.View style={[styles.nextButton, buttonAnimation]}>
                    <Text style={{fontWeight: "bold"}}>
                        CONTINUAR
                    </Text>
                </Animated.View >
                </TouchableOpacity>
            </View>
        </View>
    )
}