import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#372e29",
        paddingTop: "20%",
    },
    question: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
        marginTop: 30,
        marginBottom: 20
    },
    floatButton: {
        width: 110, 
        height: 110,
        borderRadius: 60,
        backgroundColor: "#fff",
        position: "absolute",
        top: "27%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10

    },
    slytherin: {
        backgroundColor: "#022C05",
        padding: 5,
        borderRadius: 60,
        elevation: 5
    },
    gryffindor: {
        backgroundColor: "#4a0801",
        padding: 5,
        borderRadius: 60,
        marginTop: -110,
        elevation: 5

    },
    ravenclaw: {
        backgroundColor: "#000b2f",
        padding: 5,
        borderRadius: 60,
        marginTop: 90,
        elevation: 5

    },
    hufflepuff: {
        backgroundColor: "#5a4000",
        padding: 5,
        borderRadius: 60,
        marginTop: -115,
        elevation: 5

    }


    
})