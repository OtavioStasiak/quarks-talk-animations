import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#c22a2a",
        paddingTop: "20%"
    },
    question: {
        fontWeight: "bold",
        fontSize: 17,
    },
    listContainer: {
        width: "100%",
        backgroundColor: "#1d2434",
        height: "65%",
        marginTop: "5%",
        borderWidth: 3,
        borderColor: "#181719",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        alignItems: "center",
        paddingTop: "3%",
        paddingBottom: "10%"
    },
    listItem: {
        width: "95%",
        marginLeft: "2.5%",
        padding: 5,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#181719",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    label: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18
    },
    nextButton: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c22a2a",
        paddingVertical: 13,
        elevation: 5
    },
})