import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesome6 } from "@expo/vector-icons";

import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

export default function Header() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.flex}>
        <Image source={require("@/assets/images/favicon.png")} />
        <Text>E-bet</Text>
        <FontAwesome6 name="earth-asia" size={25} />
        <TouchableOpacity style={styles.buttons}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
});
