import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1F2839", 
        paddingTop: 60

    },
    bottomSheet: {
        backgroundColor: "#1F2839", 
        alignItems: "center",
        height: "50%",
        width: "100%",
        marginTop: -63
    },
    option: {
        width: "90%",
        borderBottomWidth: 2,
        borderBottomColor: "#c22a2a",
        paddingVertical: 10,
        alignItems: "flex-start"
    },
    optionTitle: {
        color: "#c22a2a",
        fontWeight: "bold",
        fontSize: 17
    }
})