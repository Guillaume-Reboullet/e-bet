import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesome6 } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import url from "@/config";
import ProfilPicture from "./ProfilPicture";

const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function ModalProfil({ onClose, onLogout }) {
  const [user, setUser] = useState({});
  const [money, setMoney] = useState("");
  const [modalToShow, setModalToShow] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedPicture = await AsyncStorage.getItem("picture");
      console.log(storedPicture);
      setPicture(storedPicture);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${url}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    fetchData();
  }, []);

  const redirectProfil = () => {
    router.replace("/profil");
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    onClose();
    onLogout();
  };

  const openModalPicture = () => {
    setModalToShow(true);
  };

  const closeModalPicture = () => {
    setModalToShow(false);
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={modalToShow}
        onRequestClose={closeModalPicture}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <ProfilPicture onClose={closeModalPicture} />
        </View>
      </Modal>

      <ThemedView style={styles.ModalContainer}>
        <TabBarIcon
          name={"close"}
          style={{
            fontSize: 50,
            color: "black",
            zIndex: 1,
          }}
          onPress={onClose}
        />

        <View style={styles.padding20}>
          <View style={styles.flex}>
            <View>
              <TouchableOpacity onPress={() => openModalPicture()}>
                {/* <Image source={{ picture }} style={styles.img} /> */}
                {/* <Image
                  source={require("@/assets/images/avatar/" + { picture })}
                  style={styles.img}
                /> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.pencil}>
                <FontAwesome6 name={"pencil"} size={20} color={"#9AC8CD"} />
              </TouchableOpacity>
            </View>
            <View style={styles.pl10}>
              <Text>{user && user.username}</Text>
              <Text>Money in wallet</Text>
            </View>
          </View>

          <View style={styles.walletContainer}>
            <Text style={styles.width}>Wallet</Text>

            <TextInput
              style={styles.input}
              placeholder="Money"
              value={money}
              onChangeText={(text) => setMoney(text)}
            />
            <TouchableOpacity style={styles.deposit}>
              <Text style={styles.center}>Deposit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => redirectProfil()}
            style={styles.border}
          >
            <View style={styles.flexRow}>
              <FontAwesome6 name="user" size={25} />
              <Text style={styles.marginLeft}>My account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.border}>
            <View style={styles.flexRow}>
              <FontAwesome6 name="clock-rotate-left" size={25} />
              <Text style={styles.marginLeft}>Bet history</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.border}>
            <View style={styles.flexRow}>
              <FontAwesome6 name="money-bill-transfer" size={25} />
              <Text style={styles.marginLeft}>Withdraw</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.flexCenter}>
            <TouchableOpacity style={styles.button}>
              <Text>Contact support</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logout()} style={styles.button}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "#f5f6fa",
    height: height,
  },
  padding20: {
    padding: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  pencil: {
    alignItems: "flex-end",
    top: -15,
  },
  pl10: {
    paddingLeft: 20,
  },
  walletContainer: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  deposit: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "50%",
    borderRadius: 10,
  },
  center: {
    textAlign: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  marginLeft: {
    marginLeft: 10,
  },
  border: {
    padding: 10,
    borderWidth: 1,
    borderColor: "Black",
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderWidth: 1,
    borderColor: "Black",
    borderRadius: 10,
    marginBottom: 15,
    width: "75%",
  },
  flexCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
