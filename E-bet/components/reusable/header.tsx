import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signUp";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesome6 } from "@expo/vector-icons";

import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modalToShow, setModalToShow] = useState("");

  const openModal = (modal: string) => {
    setModalToShow(modal);
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={close}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          {modalToShow == "login" ? (
            <Login onClose={close} />
          ) : (
            <SignUp onClose={close} />
          )}
        </View>
      </Modal>

      <ThemedView style={styles.container}>
        <View style={styles.flex}>
          <Image source={require("@/assets/images/favicon.png")} />
          <Text>E-bet</Text>
          <FontAwesome6 name="earth-asia" size={25} />
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => openModal("login")}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => openModal("register")}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 25,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttons: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
