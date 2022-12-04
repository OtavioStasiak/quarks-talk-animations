import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#e2b8ff",
        paddingTop: "20%"
    },
    image: {
        width: "80%",
        height: "41%"
    },
    question: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: "10%",
        color: "#5a189a"

    },
    button: {
        width: "95%",
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffd60a",
        marginTop: "15%",
        elevation: 5,
        borderRadius: 3
    },
    buttonText: {
        fontWeight: "bold",
        color: "#5a189a"
    },
    picker: {
        width: "95%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        flexDirection: "row",
        borderWidth: 3,
        paddingVertical: 10,
        borderColor: "#5a189a",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "#ffd60a"
    },
    pickerContent: {
        width: "95%",
        borderColor: "#5a189a",
        borderTopColor: "transparent",
        borderWidth: 3,
        marginTop: -10,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: "#ffd60a"

    },
    pickerItem: {
        width: "100%",
        paddingLeft: 5,
        paddingVertical: 10,

    }
})