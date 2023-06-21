import React from "react";
import { Modal, ModalProps, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "theme";

export interface LoaderModalProps {
  visible?: boolean;
  transparent?: ModalProps["transparent"];
  animationType?: ModalProps["animationType"];
}

const LoaderModal = ({
  visible,
  transparent = true,
  animationType,
}: LoaderModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
    >
      <View style={styles.modalContent}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoaderModal;
