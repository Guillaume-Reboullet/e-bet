import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

import { useState } from "react";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import url from "@/config";
import { PictureChoose } from "./PictureChoose";

const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function ProfilPicture({ onClose }) {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [isChecked, setChecked] = useState(false);

  const handleSubmit = async (image) => {};

  return (
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
      <FlatList
        data={PictureChoose}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSubmit(item.image)}>
            <Image source={item.image} />
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "#f5f6fa",
    height: height / 1.7,
    position: "absolute",
    bottom: 0,
  },
});
