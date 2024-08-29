import React, { useEffect, useState } from "react";
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
import ModalProfil from "@/components/modalUser/modalProfil";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modalToShow, setModalToShow] = useState("");
  const [modalProfil, setModalProfil] = useState(false);
  const [log, setLog] = useState(false);

  useEffect(() => {
    const fetchStorage = async () => {
      const token = await AsyncStorage.getItem("token");
      setLog(!!token);
    };
    fetchStorage();
  }, []);

  const openModal = (modal: string) => {
    setModalToShow(modal);
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
    setModalProfil(false);
  };

  const openLogin = () => {
    setModalToShow("login");
    setShowModal(true);
  };

  const openUser = () => {
    setModalProfil(true);
  };

  const handleLoginSuccess = () => {
    setLog(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setLog(false);
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={modalProfil}
        onRequestClose={close}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <ModalProfil onClose={close} onLogout={handleLogout} />
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={close}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          {modalToShow === "login" ? (
            <Login onClose={close} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignUp onClose={close} openLogin={openLogin} />
          )}
        </View>
      </Modal>

      <ThemedView style={styles.container}>
        <View style={styles.flex}>
          <Image source={require("@/assets/images/logo/logo_ebet.png")} />
          <Text>E-bet</Text>
          <FontAwesome6 name="earth-asia" size={25} />

          {log ? (
            <TouchableOpacity onPress={openUser}>
              <FontAwesome6 name="user" size={25} />
            </TouchableOpacity>
          ) : (
            <>
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
            </>
          )}
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
