import * as React from "react";
import Screen from "../../components/Screen";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "ui";
import { colors } from "theme";
import { login } from "api";
import {NavigationProp, useNavigation} from "@react-navigation/native";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation();

    const sendPasswordResetEmail = () => {
        setError("");
        setLoading(true);
    };

    return (
        <Screen customStyles={{}}>
            <Text style={styles.title}>Forgot Password</Text>
            <Input
                placeholder="Email address"
                customStyles={styles.input}
                onChange={(text: string) => setEmail(text)}
            />
            <Button text="Send Mail" onClick={sendPasswordResetEmail} customStyles={styles.button} textStyles={styles.buttonText} loading={loading}/>
            {error && <Text style={styles.error}>{error}</Text>}
            <Button
                text="Resend Email?"
                onClick={() => {}}
                customStyles={styles.transparentButton}
                textStyles={styles.transparentButtonText}
            />
            <View style={styles.separator}>
                <View style={styles.line}></View>
                <Text style={styles.separatorText}>Or</Text>
                <View style={styles.line}></View>
            </View>
            <Button
                text="Login"
                onClick={() => {}}
                customStyles={styles.newAccountButton}
                textStyles={styles.newAccountButtonText}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "90%",
        alignSelf: "center",
    },
    buttonText: {
        fontWeight: "bold",
    },
    error: {
        color: colors.danger,
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    input: {
        marginVertical: 5,
        width: "90%",
        alignSelf: "center",
    },
    line: {
        width: "40%",
        borderTopWidth: 1,
        borderTopColor: colors.medium,
    },
    newAccountButton: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.medium,
        width: "70%",
        alignSelf: "center",
        marginTop: 30,
    },
    newAccountButtonText: {
        color: colors.dark,
        fontWeight: "bold",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    separatorText: {
        color: colors.dark,
    },
    title: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 50,
    },
    transparentButton: {
        backgroundColor: colors.transparent,
    },
    transparentButtonText: {
        color: colors.primary,
    },
});

export default ForgotPassword;
