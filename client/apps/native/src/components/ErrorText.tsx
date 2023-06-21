import React from "react";
import {StyleSheet, Text} from "react-native";
import {colors} from "theme";

export interface ErrorTextProps {
    text: string;
}
const ErrorText = ({ text }: ErrorTextProps) => {
    return (
        <Text style={styles.text}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.danger,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default ErrorText;